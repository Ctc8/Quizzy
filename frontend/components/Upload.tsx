import { useState } from "react"
import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	MenuItem,
	Select,
	Snackbar,
	Stack,
	TextField,
	Typography,
	Alert,
	InputLabel,
} from "@mui/material"

function Upload() {
	const [file, setFile] = useState<File | null>(null)
	const [customPrompt, setCustomPrompt] = useState("")
	const [selectedPrompt, setSelectedPrompt] = useState("")
	const [flashcardSetName, setFlashcardSetName] = useState("")
	const [toast, setToast] = useState<{
		open: boolean
		message: string
		severity: "success" | "info" | "warning" | "error"
	}>({
		open: false,
		message: "",
		severity: "info",
	})

	const predefinedPrompts = [
		{
			value: "1",
			label:
				"Extract the key terms from the text below and create vocabulary flashcards",
		},
		{
			value: "2",
			label:
				"Create flashcards with questions on one side and answers on the other",
		},
		{
			value: "3",
			label:
				"Make flashcards that explain key concepts found in the uploaded text",
		},
	]

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			// Check if the file is a PDF or DOCX
			const fileType = selectedFile.type
			if (
				fileType === "application/pdf" ||
				fileType ===
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			) {
				setFile(selectedFile)
			} else {
				setToast({
					open: true,
					message: "Please upload a PDF or DOCX file.",
					severity: "error",
				})
			}
		}
	}

	const handleGenerateFlashcards = () => {
		if (!file) {
			setToast({
				open: true,
				message: "Please upload a file first.",
				severity: "warning",
			})
			return
		}

		if (!flashcardSetName.trim()) {
			setToast({
				open: true,
				message: "Please enter a name for your flashcard set.",
				severity: "warning",
			})
			return
		}

		// Logic for generating flashcards would go here
		console.log({
			file,
			prompt: customPrompt || selectedPrompt,
			name: flashcardSetName,
		})

		setToast({
			open: true,
			message: "Your flashcards are being generated.",
			severity: "info",
		})
	}

	const handleCloseToast = () => {
		setToast({ ...toast, open: false })
	}

	return (
		<Container maxWidth="md" sx={{ py: 5 }}>
			<Stack spacing={4}>
				<Typography variant="h4" component="h1" align="center">
					Upload Documents for Flashcards
				</Typography>

				<Box
					sx={{
						border: "2px dashed",
						borderColor: "grey.300",
						borderRadius: 1,
						p: 5,
						textAlign: "center",
						"&:hover": { borderColor: "primary.main" },
					}}
				>
					<input
						type="file"
						id="file-upload"
						onChange={handleFileChange}
						accept=".pdf,.docx"
						style={{ display: "none" }}
					/>
					<label htmlFor="file-upload">
						<Button variant="contained" component="span" sx={{ mb: 2 }}>
							Choose PDF or DOCX
						</Button>
					</label>
					{file ? (
						<Typography sx={{ mt: 2 }}>Selected: {file.name}</Typography>
					) : (
						<Typography color="text.secondary">
							Drag and drop a file or click to select
						</Typography>
					)}
				</Box>

				<FormControl fullWidth variant="outlined">
					<InputLabel id="prompt-template-label">
						Select a Prompt Template
					</InputLabel>
					<Select
						labelId="prompt-template-label"
						id="prompt-template-select"
						value={selectedPrompt}
						label="Select a Prompt Template"
						onChange={e => {
							setSelectedPrompt(e.target.value)
							setCustomPrompt("")
						}}
					>
						<MenuItem value="" disabled>
							Choose a predefined prompt
						</MenuItem>
						{predefinedPrompts.map(prompt => (
							<MenuItem key={prompt.value} value={prompt.value}>
								{prompt.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth>
					<TextField
						label="Or Write a Custom Prompt"
						value={customPrompt}
						onChange={e => {
							setCustomPrompt(e.target.value)
							setSelectedPrompt("")
						}}
						fullWidth
					/>
				</FormControl>

				<FormControl fullWidth>
					<TextField
						label="Flashcard Set Name"
						placeholder="Enter a name for your flashcard set"
						required
						inputProps={{ maxLength: 100 }}
						helperText="Give your flashcards a memorable name (required)"
						onChange={e => setFlashcardSetName(e.target.value)}
						value={flashcardSetName}
					/>
				</FormControl>

				<Button
					variant="contained"
					color="success"
					size="large"
					onClick={handleGenerateFlashcards}
					disabled={!file || !flashcardSetName.trim()}
					fullWidth
				>
					Generate Flashcards
				</Button>
			</Stack>

			<Snackbar
				open={toast.open}
				autoHideDuration={3000}
				onClose={handleCloseToast}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert onClose={handleCloseToast} severity={toast.severity}>
					{toast.message}
				</Alert>
			</Snackbar>
		</Container>
	)
}

export default Upload
