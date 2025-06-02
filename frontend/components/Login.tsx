import React, { useState } from "react"
import {
	Box,
	Button,
	TextField,
	Typography,
	Paper,
	Link,
	Container,
	InputAdornment,
	IconButton,
	Alert,
	Divider,
	CircularProgress,
} from "@mui/material"
import { Grid } from "@mui/material"
import {
	Visibility,
	VisibilityOff,
	Login as LoginIcon,
	Google as GoogleIcon,
	GitHub as GitHubIcon,
} from "@mui/icons-material"

function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
		if (error) setError("")
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		if (error) setError("")
	}

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// Basic validation
		if (!email) {
			setError("Email is required")
			return
		}
		if (!password) {
			setError("Password is required")
			return
		}

		// Simulate login process
		setIsLoading(true)
		setError("")

		// Mock API call - replace with actual authentication logic
		setTimeout(() => {
			setIsLoading(false)
			// For demo purposes - you would handle authentication here
			console.log("Login attempted with:", { email, password })
			// setError('Invalid credentials'); // Example error
		}, 1000)
	}

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} sx={{ mt: 8, p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography
						component="h1"
						variant="h4"
						gutterBottom
						sx={{ fontWeight: 600 }}
					>
						Sign In to FlashcardPro
					</Typography>
					<Typography variant="body2" color="text.secondary" mb={3}>
						Enter your credentials to access your account
					</Typography>

					{error && (
						<Alert severity="error" sx={{ width: "100%", mb: 2 }}>
							{error}
						</Alert>
					)}

					<Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={handleEmailChange}
							sx={{ mb: 2 }}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							id="password"
							autoComplete="current-password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={handlePasswordChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleTogglePasswordVisibility}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{ mb: 3 }}
						/>

						<Box sx={{ textAlign: "right", mb: 2 }}>
							<Link href="#" underline="hover" variant="body2">
								Forgot password?
							</Link>
						</Box>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							size="large"
							disabled={isLoading}
							startIcon={isLoading ? null : <LoginIcon />}
							sx={{
								py: 1.5,
								mb: 3,
								position: "relative",
							}}
						>
							{isLoading ? (
								<CircularProgress size={24} sx={{ position: "absolute" }} />
							) : (
								"Sign In"
							)}
						</Button>

						<Divider sx={{ my: 2 }}>
							<Typography variant="body2" color="text.secondary">
								OR
							</Typography>
						</Divider>

						<Grid container spacing={2} sx={{ mb: 3 }}>
							<Grid xs={6}>
								<Button
									fullWidth
									variant="outlined"
									startIcon={<GoogleIcon />}
									sx={{ py: 1 }}
								>
									Google
								</Button>
							</Grid>
							<Grid xs={6}>
								<Button
									fullWidth
									variant="outlined"
									startIcon={<GitHubIcon />}
									sx={{ py: 1 }}
								>
									GitHub
								</Button>
							</Grid>
						</Grid>

						<Box sx={{ textAlign: "center" }}>
							<Typography variant="body2">
								Don't have an account?{" "}
								<Link href="#" underline="hover" fontWeight="500">
									Sign up
								</Link>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Paper>
		</Container>
	)
}

export default Login
