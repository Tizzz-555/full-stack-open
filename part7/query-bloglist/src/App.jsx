import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Login from "./components/Login";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useUserDispatch, useUserValue } from "./LoginContext";

const App = () => {
	const userDispatch = useUserDispatch();
	const user = useUserValue();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const blogFormRef = useRef();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			userDispatch({
				type: "LOGGED-IN",
				payload: user,
			});
			blogService.setToken(user.token);
		}
	}, []);

	const logoutUser = () => {
		window.localStorage.removeItem("loggedBlogAppUser");
		userDispatch({
			type: "LOGGED-OUT",
		});
	};

	if (user === null) {
		return (
			<>
				<h2>Log in to application</h2>
				<Notification />

				<Login
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					user={user}
				/>
			</>
		);
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification />
			<p>
				{user.name} logged in
				<button onClick={logoutUser}>Logout</button>
			</p>
			<Togglable buttonLabel="Create new blog" ref={blogFormRef}>
				<BlogForm />
			</Togglable>
			<BlogList user={user} />
		</div>
	);
};

export default App;
