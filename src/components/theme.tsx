import { createTheme, responsiveFontSizes } from "@mui/material/styles"

// Color palette
const colors = {
	cream: "#F9F4EA",
	darkGray: "#313733",
	darkGrayAlt: "#3C3E37",
	orange: "#E78842",
	lightCream: "#F7F2E7",
}

// Create theme
let theme = createTheme({
	palette: {
		primary: {
			main: colors.orange,
			contrastText: colors.lightCream,
		},
		secondary: {
			main: colors.darkGrayAlt,
			contrastText: colors.cream,
		},
		background: {
			default: colors.cream,
			paper: colors.lightCream,
		},
		text: {
			primary: colors.darkGray,
			secondary: colors.darkGrayAlt,
		},
		error: {
			main: "#d32f2f", // Keeping default error color for clear error states
		},
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		h1: {
			color: colors.darkGray,
		},
		h2: {
			color: colors.darkGray,
		},
		h3: {
			color: colors.darkGray,
		},
		h4: {
			color: colors.darkGrayAlt,
		},
		h5: {
			color: colors.darkGrayAlt,
		},
		h6: {
			color: colors.darkGrayAlt,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					textTransform: "none",
					fontWeight: 500,
				},
				contained: {
					boxShadow: "none",
					"&:hover": {
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
					},
				},
				outlined: {
					borderColor: colors.orange,
					color: colors.orange,
					"&:hover": {
						borderColor: colors.orange,
						backgroundColor: `${colors.orange}10`, // Very light orange background on hover
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: colors.lightCream,
					borderRadius: 8,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: colors.lightCream,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: colors.darkGray,
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					backgroundColor: `${colors.darkGrayAlt}20`, // Semi-transparent divider
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						"&:hover fieldset": {
							borderColor: colors.orange,
						},
						"&.Mui-focused fieldset": {
							borderColor: colors.orange,
						},
					},
				},
			},
		},
	},
})

// Make fonts responsive
theme = responsiveFontSizes(theme)

export default theme

// Color palette reference:
// Cream: #F9F4EA - Background
// Dark Gray: #313733 - Primary text
// Dark Gray Alt: #3C3E37 - Secondary elements
// Orange: #E78842 - Accent color / Primary action
// Light Cream: #F7F2E7 - Card background, paper elements
