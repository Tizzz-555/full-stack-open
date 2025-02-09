import { useState } from "react";
import {
	Routes,
	Route,
	Link,
	Navigate,
	useParams,
	useNavigate,
	useMatch,
} from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);

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

	const buttonStyle = {
		padding: 5,
		backgroundColor: "#e9e9ed",
		border: "1px solid darkgrey",
		textDecoration: "none",
		color: "black",
		borderRadius: "5px",
		marginRight: "5px",
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
				<Link style={buttonStyle} to="/new-book">
					add book
				</Link>
			</div>
			<Notify errorMessage={errorMessage} />
			<Routes>
				<Route path="/authors" element={<Authors setError={notify} />} />
				<Route path="/" element={<Books />} />
				<Route path="/new-book" element={<NewBook setError={notify} />} />
			</Routes>
		</div>
	);
};

export default App;
