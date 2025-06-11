import React, { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import {
	Box,
	Typography,
	Container,
	Button,
	CircularProgress,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"

function Home() {
	const [user, setUser] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const [signOutLoading, setSignOutLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		// Get the current authenticated user
		async function getUserData() {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession()

				if (session?.user) {
					setUser(session.user)
				}
			} catch (error) {
				console.error("Error fetching user data:", error)
			} finally {
				setLoading(false)
			}
		}

		getUserData()
	}, [])

	const handleGetStarted = () => {
		if (user) {
			// If user is logged in, go to sets
			navigate("/sets")
		} else {
			// If not logged in, go to login page
			navigate("/login")
		}
	}

	const handleSignOut = async () => {
		try {
			setSignOutLoading(true)
			await supabase.auth.signOut()
			setUser(null)
			// Redirect to home after sign out
			navigate("/")
		} catch (error) {
			console.error("Error signing out:", error)
		} finally {
			setSignOutLoading(false)
		}
	}

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Container maxWidth="md">
			<Box sx={{ mt: 8, textAlign: "center" }}>
				{user && (
					<Box sx={{ position: "absolute", top: 20, right: 20 }}>
						<Button
							variant="outlined"
							color="primary"
							onClick={handleSignOut}
							startIcon={<LogoutIcon />}
							disabled={signOutLoading}
						>
							{signOutLoading ? "Signing Out..." : "Sign Out"}
						</Button>
					</Box>
				)}

				<Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
					Quizzy
				</Typography>

				<Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
					{user ? `Welcome, ${user.email}` : "Welcome to Quizzy!"}
				</Typography>

				<Typography variant="body1" paragraph>
					Create and study AI-generated flashcards in seconds!
				</Typography>

				<Box sx={{ mt: 6 }}>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={handleGetStarted}
						sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
					>
						{user ? "View My Sets" : "Get Started"}
					</Button>

					{user && (
						<Button
							variant="outlined"
							size="large"
							onClick={() => navigate("/upload")}
							sx={{ ml: 2, px: 4, py: 1.5, fontSize: "1.1rem" }}
						>
							Create New Set
						</Button>
					)}
				</Box>
			</Box>
		</Container>
	)
}

export default Home
