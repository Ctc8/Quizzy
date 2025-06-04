import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 8080

// Middleware with more explicit CORS configuration
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

// Simple route
app.get("/hello", (req, res) => {
	res.json({ message: "it works! Hello from FlashcardProAI backend!" })
})

//post
app.get("/api/generate", (req, res) => {
	res.json({ message: "generate works" })
})

//get

//post

// Test route with no authentication
app.get("/", (req, res) => {
	res.send("FlashcardProAI server is running!")
})

// Start server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
	console.log(`Try accessing: http://localhost:${PORT}/`)
})
