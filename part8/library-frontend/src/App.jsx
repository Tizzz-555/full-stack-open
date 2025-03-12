import { useState } from "react";
import { useApolloClient, useSubscription, useQuery } from "@apollo/client";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const buttonStyle = {
	padding: 5,
	backgroundColor: "#e9e9ed",
	border: "1px solid darkgrey",
	textDecoration: "none",
	color: "black",
	borderRadius: "5px",
	marginRight: "5px",
};

export const updateCache = (cache, query, addedBook) => {
	const uniqByName = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.title;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, (data) => {
		const allBooks = data?.allBooks || [];
		return {
			allBooks: uniqByName(allBooks.concat(addedBook)),
		};
	});
};
const App = () => {
	const [token, setToken] = useState(() =>
		localStorage.getItem("library-user-token")
	);
	const [genre, setGenre] = useState(null);
	const { loading, error, data } = useQuery(ALL_BOOKS, {
		variables: { genre },
	});

	const [okMessage, setOkMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const client = useApolloClient();
	const navigate = useNavigate();

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded;
			notify(`${addedBook.title} added`, true);
			updateCache(
				client.cache,
				{ query: ALL_BOOKS, variables: { genre } },
				addedBook
			);
		},
	});

	if (loading) {
		return <div>loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const logout = () => {
		setToken(null);
		localStorage.removeItem("library-user-token");
		client.resetStore();
		navigate("/");
	};

	const notify = (message, status) => {
		if (status) {
			setOkMessage(message);
			setTimeout(() => {
				setOkMessage(null);
			}, 2000);
		}
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 2000);
	};

	const Notify = ({ errorMessage }) => {
		if (!okMessage && !errorMessage) {
			return null;
		}
		const okStyle = {
			color: "green",
			background: "lightgrey",
			fontSize: "20px",
			borderStyle: "solid",
			width: "25%",
			borderRadius: "5px",
			padding: "10px",
			marginBottom: "10px",
		};

		const errorStyle = {
			color: "red",
			background: "lightgrey",
			fontSize: "20px",
			borderStyle: "solid",
			width: "50%",
			borderRadius: "5px",
			padding: "10px",
			marginBottom: "10px",
		};

		if (okMessage) {
			return <div style={okStyle}>{okMessage}</div>;
		} else if (errorMessage) {
			return <div style={errorStyle}>{errorMessage}</div>;
		}
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
			<Notify errorMessage={errorMessage} okMessage={okMessage} />
			<Routes>
				<Route path="/authors" element={<Authors setError={notify} />} />
				<Route
					path="/"
					element={
						<Books genre={genre} setGenre={setGenre} books={data.allBooks} />
					}
				/>
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
