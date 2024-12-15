import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import {
	useNotificationDispatch,
	setNotification,
} from "./NotificationContext";

const App = () => {
	const dispatch = useNotificationDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const blogFormRef = useRef();

	// User log in
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const result = useQuery({
		queryKey: ["blogs"],
		queryFn: blogService.getAll,
		refetchOnWindowFocus: false,
		retry: 1,
	});

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (result.isError) {
		return <div>blog service not available due to problems in server</div>;
	}

	const blogs = result.data;

	const addLikeTo = async (blogObject) => {
		const id = blogObject.id;
		const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 };
		const returnedBlog = await blogService.updateBlog(id, updatedBlog);
		setXblogs(
			blogs
				.map((blog) => (blog.id !== id ? blog : returnedBlog))
				.sort((a, b) => b.likes - a.likes)
		);
		setNotification(dispatch, `you voted "${returnedBlog.title}"`, true, 5);
	};

	const deleteABlog = async (id) => {
		const blogToDelete = blogs.find((b) => b.id === id);

		if (
			window.confirm(
				`Remove '${blogToDelete.title}' by ${blogToDelete.author}?`
			)
		) {
			try {
				await blogService.deleteBlog(id);
				setXblogs(blogs.filter((b) => b.id !== id));
				setNotification(dispatch, `Deleted ${blogToDelete.title}`, true, 5);
			} catch (error) {
				console.error("Error deleting the blog:", error);
				setNotification(
					dispatch,
					error?.response?.data?.error ||
						"An error occurred while deleting the blog",
					false,
					5
				);
			}
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
				<Notification />

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
			<Notification />
			<p>
				{user.name} logged in
				<button onClick={logoutUser}>Logout</button>
			</p>
			<Togglable buttonLabel="Create new blog" ref={blogFormRef}>
				<BlogForm />
			</Togglable>
			{blogs?.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					addLike={() => addLikeTo(blog)}
					removeBlog={() => deleteABlog(blog.id)}
					deletable={user.username === blog.user.username}
				/>
			))}
		</div>
	);
};

export default App;
