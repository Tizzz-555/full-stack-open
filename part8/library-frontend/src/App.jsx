import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

export const buttonStyle = {
	padding: 5,
	backgroundColor: "#e9e9ed",
	border: "1px solid darkgrey",
	textDecoration: "none",
	color: "black",
	borderRadius: "5px",
	marginRight: "5px",
};

const App = () => {
	const [token, setToken] = useState(() =>
		localStorage.getItem("library-user-token")
	);
	const [errorMessage, setErrorMessage] = useState(null);
	const client = useApolloClient();
	const navigate = useNavigate();

	const logout = () => {
		setToken(null);
		localStorage.removeItem("library-user-token");
		client.resetStore();
		navigate("/");
	};

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const Notify = ({ errorMessage }) => {
		if (!errorMessage) {
			return null;
		}
		return <div style={{ color: "red" }}> {errorMessage} </div>;
	};

	return (
		<div>
			<div>
				<Link style={buttonStyle} to="/authors">
					authors
				</Link>
				<Link style={buttonStyle} to="/">
					books
				</Link>
				{token ? (
					<>
						<Link style={buttonStyle} to="/new-book">
							add book
						</Link>
						<Link style={buttonStyle} to="/recommendations">
							recommended
						</Link>
						<button style={buttonStyle} onClick={logout}>
							logout
						</button>
					</>
				) : (
					<Link style={buttonStyle} to="login">
						login
					</Link>
				)}
			</div>
			<Notify errorMessage={errorMessage} />
			<Routes>
				<Route path="/authors" element={<Authors setError={notify} />} />
				<Route path="/" element={<Books />} />
				<Route
					path="/login"
					element={<LoginForm setToken={setToken} setError={notify} />}
				/>
				<Route path="/new-book" element={<NewBook setError={notify} />} />
				<Route
					path="/recommendations"
					element={<Recommended setError={notify} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
