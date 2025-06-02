import "./App.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from "react-router-dom"
// Corrected import paths
import Login from "../frontend/components/Login"
import Upload from "../frontend/components/Upload" 
import Home from "../frontend/components/Home"
import Sets from "../frontend/components/Sets"
import Flashcards from "../frontend/components/Flashcards"

function App() {
	const isAuthenticated = false

	return (
		<Router>
			<div>
				{/* Optional: Navigation menu */}
				<nav>
					<ul
						style={{
							display: "flex",
							gap: "20px",
							listStyle: "none",
							padding: "16px",
						}}
					>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/upload">Upload</Link>
						</li>
						<li>
							<Link to="/flashcards">Flashcards</Link>
						</li>
						<li>
							<Link to="/sets">Sets</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/flashcards" element={<Flashcards />} />
					<Route path="/sets" element={<Sets />} />
					<Route
						path="/upload"
						element={<Upload />}
						// element={
						//   // Optional: Protect the upload route
						//   isAuthenticated ? <Upload /> : <Navigate to="/login" />
						// }
					/>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
