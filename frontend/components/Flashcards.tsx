import { useState, useEffect, useRef } from "react"
import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	Container,
	Paper,
} from "@mui/material"
import { ArrowBack, ArrowForward, FirstPage } from "@mui/icons-material"

interface Flashcard {
	id: number
	question: string
	answer: string
}

function Flashcards() {
	const [flashcards, setFlashcards] = useState<Flashcard[]>([
		{
			id: 1,
			question: "What is React?",
			answer: "A JavaScript library for building user interfaces",
		},
		{
			id: 2,
			question: "What is JSX?",
			answer: "A syntax extension for JavaScript that looks similar to HTML",
		},
		{
			id: 3,
			question: "What is a component?",
			answer: "An independent, reusable piece of UI",
		},
	])

	const [currentIndex, setCurrentIndex] = useState(0)
	const [showAnswer, setShowAnswer] = useState(false)
	const [disableAnimation, setDisableAnimation] = useState(false)
	const flipCardRef = useRef<HTMLDivElement>(null)

	// Simple navigation without flip animation
	const handlePrevious = () => {
		// Disable animation temporarily
		setDisableAnimation(true)

		// Reset to question side and change index in one go
		setShowAnswer(false)
		setCurrentIndex(
			prevIndex => (prevIndex - 1 + flashcards.length) % flashcards.length
		)
	}

	// Simple navigation without flip animation
	const handleNext = () => {
		// Disable animation temporarily
		setDisableAnimation(true)

		// Reset to question side and change index in one go
		setShowAnswer(false)
		setCurrentIndex(prevIndex => (prevIndex + 1) % flashcards.length)
	}

	// Regular toggle with animation
	const toggleAnswer = () => {
		// Make sure animations are enabled when manually flipping
		setDisableAnimation(false)
		setShowAnswer(!showAnswer)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setDisableAnimation(false)
		}, 50)

		return () => clearTimeout(timer)
	}, [currentIndex])

	const handleReset = () => {
		// Disable animation temporarily
		setDisableAnimation(true)

		// Reset to question side and first card
		setShowAnswer(false)
		setCurrentIndex(0)
	}

	return (
		<Container maxWidth="sm" sx={{ mt: 4 }}>
			<Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
				<Typography
					variant="h4"
					component="h1"
					gutterBottom
					align="center"
					sx={{ fontWeight: "bold" }}
				>
					Flashcards
				</Typography>

				<div
					ref={flipCardRef}
					className={`flip-card ${showAnswer ? "flipped" : ""} ${
						disableAnimation ? "no-animation" : ""
					}`}
					onClick={toggleAnswer}
				>
					<div
						className={`flip-card-inner ${
							disableAnimation ? "no-animation" : ""
						}`}
					>
						{/* Front side - Question */}
						<div className="flip-card-front">
							<CardContent sx={{ textAlign: "center", width: "100%" }}>
								<Typography variant="body1" sx={{ fontWeight: "medium" }}>
									{flashcards[currentIndex]?.question}
								</Typography>
							</CardContent>
						</div>

						{/* Back side - Answer */}
						<div className="flip-card-back">
							<CardContent sx={{ textAlign: "center", width: "100%" }}>
								<Typography variant="body1">
									{flashcards[currentIndex]?.answer}
								</Typography>
							</CardContent>
						</div>
					</div>
				</div>

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Button
						variant="contained"
						color="secondary"
						onClick={handlePrevious}
						startIcon={<ArrowBack />}
						disabled={currentIndex === 0}
					>
						Previous
					</Button>

					<Typography variant="body2">
						Card {currentIndex + 1} of {flashcards.length}
					</Typography>

					<Button
						variant="contained"
						color="primary"
						onClick={handleNext}
						endIcon={<ArrowForward />}
						disabled={currentIndex === flashcards.length - 1}
					>
						Next
					</Button>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
					<Button
						variant="outlined"
						color="info"
						onClick={handleReset}
						startIcon={<FirstPage />}
						disabled={currentIndex === 0}
					>
						Back to First Card
					</Button>
				</Box>
			</Paper>
		</Container>
	)
}

export default Flashcards
