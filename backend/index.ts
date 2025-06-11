import express from "express"
import cors from "cors"
import multer from "multer"
import pdfParse from "pdf-parse"
import mammoth from "mammoth"
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config()

// gemini API
const genAI = new GoogleGenerativeAI(
	process.env.GEMINI_API_KEY || "AIzaSyB1EhSQQxZNxI0I1aeYhjvqNSFE5UNSkR0"
)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const app = express()
const PORT = process.env.PORT || 8080

// CORS setup
app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"http://127.0.0.1:3000",
			"http://localhost:5173",
		],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
)

app.use(express.json())

// Set up multer to handle file uploads in memory
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
})

// Test route
app.get("/", (req, res) => {
	res.send("FlashcardProAI server is running!")
})

app.post("/api/generate-flashcards", async (req, res) => {
	try {
		const { text, prompt, name } = req.body

		if (!text || !prompt) {
			return res.status(400).json({ error: "Missing required parameters" })
		}

		// Prepare system prompt
		let systemPrompt = `You are an expert flashcard creator. 
Create flashcards based on the following content. 
For each flashcard, provide a "front" (question/term) and "back" (answer/definition).
Format your response as a JSON array with this structure:
[
  {
    "front": "Question or term here",
    "back": "Answer or definition here"
  }
]
Only return valid JSON, no other text or explanations.`

		// Call Gemini API
		const fullPrompt = `${systemPrompt}

User prompt: ${prompt}

Content to create flashcards from:
${text.substring(0, 5000)}` // Limit text size

		console.log("Calling Gemini API...")
		const result = await model.generateContent(fullPrompt)
		const response = await result.response
		const responseText = response.text()

		// Parse JSON from response
		let flashcards
		try {
			// Extract JSON if there are markdown code blocks
			const jsonRegex = /```(?:json)?\s*(\[[\s\S]*?\])\s*```|(\[[\s\S]*?\])/
			const match = responseText.match(jsonRegex)

			if (match && (match[1] || match[2])) {
				flashcards = JSON.parse(match[1] || match[2])
			} else {
				flashcards = JSON.parse(responseText)
			}

			if (
				!Array.isArray(flashcards) ||
				!flashcards.every(
					card => typeof card === "object" && "front" in card && "back" in card
				)
			) {
				throw new Error("Invalid flashcard format")
			}
		} catch (error) {
			console.error("Failed to parse flashcards:", error, responseText)
			return res.status(500).json({
				error: "Failed to generate valid flashcards",
				rawResponse: responseText,
			})
		}

		// Return the flashcards
		res.json({
			flashcards,
			name,
			count: flashcards.length,
		})
	} catch (error: any) {
		console.error("Error generating flashcards:", error)
		res
			.status(500)
			.json({ error: "Failed to generate flashcards", details: error.message })
	}
})

app.post("/api/extract-text", upload.single("file"), async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" })
	}

	try {
		let text = ""
		const fileType = req.file.mimetype

		if (fileType === "application/pdf") {
			// Handle PDF
			const data = await pdfParse(req.file.buffer)
			text = data.text
		} else if (
			fileType ===
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		) {
			// Handle DOCX
			const result = await mammoth.extractRawText({ buffer: req.file.buffer })
			text = result.value
		} else {
			return res.status(400).json({
				error: "Unsupported file format. Please upload a PDF or DOCX file.",
			})
		}

		// Send extracted text back to frontend
		res.json({ text })
	} catch (err) {
		console.error("Text extraction error:", err)
		res.status(500).json({ error: "Failed to extract text from file" })
	}
})

app.post("/api/upload-pdf", upload.single("pdf"), async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" })
	}

	try {
		const data = await pdfParse(req.file.buffer)
		res.json({ text: data.text }) // Send parsed text back to frontend
	} catch (err) {
		console.error("PDF parse error:", err)
		res.status(500).json({ error: "Failed to parse PDF" })
	}
})

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
	console.log(`Try accessing: http://localhost:${PORT}/`)
})
