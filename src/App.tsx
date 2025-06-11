import "./App.css"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
} from "react-router-dom"
import Login from "../frontend/Login"
import SignUp from "../frontend/SignUp" // Import the new SignUp component
import Upload from "../frontend/Upload"
import Home from "../frontend/Home"
import Sets from "../frontend/Sets"
import Flashcards from "../frontend/Flashcards"

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
							<Link to="/sets">Sets</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />{" "}
					<Route path="/flashcards/:id" element={<Flashcards />} />
					<Route path="/flashcards/:id/edit" element={<Upload />} />
					<Route path="/sets" element={<Sets />} />
					<Route path="/upload" element={<Upload />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
