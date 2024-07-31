import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [okMessage, setOkMessage] = useState(null);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const addBlog = async (e) => {
		e.preventDefault();
		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		};

		try {
			const returnedBlog = await blogService.create(blogObject);
			setBlogs(blogs.concat(returnedBlog));
			setOkMessage(
				`A new blog ${blogObject.title} by ${blogObject.author} added`
			);
			setTimeout(() => {
				setOkMessage(null);
			}, 5000);

			setNewTitle("");
			setNewAuthor("");
			setNewUrl("");
		} catch (e) {
			setErrorMessage(e.response.data.error);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const logoutUser = () => {
		window.localStorage.removeItem("loggedBlogAppUser");
		setUser(null);
	};

	if (user === null) {
		return (
			<>
				<h2>Log in to application</h2>
				<Notification errorMessage={errorMessage} />

				<Login
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					user={user}
					setUser={setUser}
					errorMessage={errorMessage}
					setOkMessage={setOkMessage}
					setErrorMessage={setErrorMessage}
				/>
			</>
		);
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification okMessage={okMessage} errorMessage={errorMessage} />

			<p>
				{user.name} logged in
				<button onClick={logoutUser}>Logout</button>
			</p>
			<h2>Create new</h2>
			<form onSubmit={addBlog}>
				<div>
					Title:{" "}
					<input
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
				</div>
				<div>
					Author:{" "}
					<input
						value={newAuthor}
						onChange={(e) => setNewAuthor(e.target.value)}
					/>
				</div>
				<div>
					Url:{" "}
					<input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
				</div>
				<button type="submit">Create</button>
			</form>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
