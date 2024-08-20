import { useState } from "react";

const BlogForm = ({ createABlog }) => {
	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");

	const addBlog = (e) => {
		e.preventDefault();
		createABlog({ title: newTitle, author: newAuthor, url: newUrl });

		setNewTitle("");
		setNewAuthor("");
		setNewUrl("");
	};

	return (
		<div>
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
		</div>
	);
};

export default BlogForm;
