import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	if (user === null) {
		return (
			<>
				<h2>Log in to application</h2>
				<Login
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					user={user}
					setUser={setUser}
				/>
			</>
		);
	}

	return (
		<div>
			<h2>Blogs</h2>
			<p>{user.name} logged in</p>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
