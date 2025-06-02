import React, { useState, useEffect } from "react"
import {
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	CardActions,
	Button,
	Box,
	CircularProgress,
	Divider,
	Chip,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"

// Mock data - replace with actual API call
const mockSets = [
	{
		id: 1,
		title: "Biology 101",
		cards: 42,
		lastModified: "2025-05-28",
		favorite: true,
		tags: ["science", "biology"],
	},
	{
		id: 2,
		title: "Spanish Vocabulary",
		cards: 85,
		lastModified: "2025-05-30",
		favorite: false,
		tags: ["language", "spanish"],
	},
	{
		id: 3,
		title: "JavaScript Fundamentals",
		cards: 36,
		lastModified: "2025-06-01",
		favorite: true,
		tags: ["programming", "javascript"],
	},
	{
		id: 4,
		title: "World History",
		cards: 120,
		lastModified: "2025-05-20",
		favorite: false,
		tags: ["history", "social studies"],
	},
]

function Sets() {
	const [sets, setSets] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
	const [setToDelete, setSetToDelete] = useState<number | null>(null)

	useEffect(() => {
		// Replace with actual API fetch
		const fetchSets = async () => {
			try {
				// const response = await fetch('/api/flashcardsets');
				// const data = await response.json();
				// setSets(data);

				// Using mock data for now
				setTimeout(() => {
					setSets(mockSets)
					setLoading(false)
				}, 800)
			} catch (error) {
				console.error("Error fetching flashcard sets:", error)
				setLoading(false)
			}
		}

		fetchSets()
	}, [])

	const handleViewSet = (id: number) => {
		// Instead of router.push, you might use window.location or a state management approach
		window.location.href = `/flashcards/${id}`
		// Alternatively, if using a state management library:
		// props.navigateToSet(id);
	}

	const handleEditSet = (id: number, e: React.MouseEvent) => {
		e.stopPropagation()
		window.location.href = `/flashcards/${id}/edit`
	}

	const handleDeleteClick = (id: number, e: React.MouseEvent) => {
		e.stopPropagation()
		setSetToDelete(id)
		setDeleteDialogOpen(true)
	}

	const confirmDelete = async () => {
		if (setToDelete !== null) {
			try {
				// Replace with actual API call
				// await fetch(`/api/flashcardsets/${setToDelete}`, { method: 'DELETE' });

				// Update UI
				setSets(sets.filter(set => set.id !== setToDelete))
				setDeleteDialogOpen(false)
				setSetToDelete(null)
			} catch (error) {
				console.error("Error deleting set:", error)
			}
		}
	}

	const toggleFavorite = (id: number, e: React.MouseEvent) => {
		e.stopPropagation()
		setSets(
			sets.map(set =>
				set.id === id ? { ...set, favorite: !set.favorite } : set
			)
		)

		// Add actual API call here to update favorite status
	}

	const handleCreateNew = () => {
		window.location.href = "/flashcards/new"
	}

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "70vh",
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 4,
				}}
			>
				<Typography variant="h4" component="h1">
					My Flashcard Sets
				</Typography>
			</Box>

			{sets.length === 0 ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "50vh",
						textAlign: "center",
					}}
				>
					<Typography variant="h6" sx={{ mb: 2 }}>
						You haven't created any flashcard sets yet
					</Typography>
					<Button variant="contained" color="primary" onClick={handleCreateNew}>
						Create Your First Set
					</Button>
				</Box>
			) : (
				// ...existing code...

				<Grid container spacing={3}>
					{sets.map(set => (
						<Grid item xs={12} sm={6} md={4} key={set.id}>
							<Card
								sx={{
									height: "280px", // Fixed height for all cards
									display: "flex",
									flexDirection: "column",
									cursor: "pointer",
									transition: "transform 0.2s, box-shadow 0.2s",
									"&:hover": {
										transform: "translateY(-4px)",
										boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
									},
									width: "100%", // Ensure full width within grid item
								}}
								onClick={() => handleViewSet(set.id)}
							>
								<CardContent
									sx={{
										flexGrow: 1,
										overflow: "hidden", // Prevent content overflow
										display: "flex",
										flexDirection: "column",
										padding: "16px", // Consistent padding
										"&:last-child": { paddingBottom: "16px" }, // Override MUI's default
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "flex-start",
										}}
									>
										<Typography
											variant="h6"
											component="h2"
											noWrap
											sx={{ maxWidth: "80%" }}
										>
											{set.title}
										</Typography>
										<IconButton
											size="small"
											onClick={e => toggleFavorite(set.id, e)}
											color={set.favorite ? "warning" : "default"}
										>
											{set.favorite ? <StarIcon /> : <StarBorderIcon />}
										</IconButton>
									</Box>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mt: 1 }}
									>
										{set.cards} cards
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mt: 0.5 }}
									>
										Last modified:{" "}
										{new Date(set.lastModified).toLocaleDateString()}
									</Typography>
									<Box
										sx={{
											mt: 2,
											display: "flex",
											flexWrap: "wrap",
											gap: 0.5,
											overflow: "hidden",
											maxHeight: "80px", // Limit tag area height
										}}
									>
										{set.tags.map((tag: string) => (
											<Chip
												key={tag}
												label={tag}
												size="small"
												color="primary"
												variant="outlined"
												onClick={e => e.stopPropagation()}
											/>
										))}
									</Box>
									<Box sx={{ flexGrow: 1 }} />{" "}
									{/* Push action area to bottom */}
								</CardContent>

								<Divider />

								<CardActions sx={{ padding: "8px 16px", height: "52px" }}>
									{" "}
									{/* Fixed height for actions */}
									<Button
										size="small"
										color="primary"
										onClick={() => handleViewSet(set.id)}
									>
										Study
									</Button>
									<Box sx={{ flexGrow: 1 }} />
									<IconButton
										size="small"
										onClick={e => handleEditSet(set.id, e)}
									>
										<EditIcon fontSize="small" />
									</IconButton>
									<IconButton
										size="small"
										color="error"
										onClick={e => handleDeleteClick(set.id, e)}
									>
										<DeleteIcon fontSize="small" />
									</IconButton>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			)}

			<Dialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
			>
				<DialogTitle>Delete Flashcard Set</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this flashcard set? This action
						cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
					<Button onClick={confirmDelete} color="error" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}

export default Sets
