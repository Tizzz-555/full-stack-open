import { useState } from "react";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";
import { updateCache } from "../App";
import { useNavigate } from "react-router-dom";

const NewBook = ({ setError }) => {
	const [createBook] = useMutation(CREATE_BOOK, {
		onError: (error) => {
			console.error("Mutation error:", error);
			const messages = error.graphQLErrors.map((e) => e.message).join("\n");
			setError(messages);
		},
		update: (cache, response) => {
			updateCache(
				cache,
				{ query: ALL_BOOKS, variables: { genre: null } },
				response.data.addBook
			);
		},
		refetchQueries: [{ query: ALL_AUTHORS }],
		onCompleted: () => {
			navigate("/");
		},
	});

	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const submit = async (event) => {
		event.preventDefault();

		createBook({ variables: { title, author, published, genres } });

		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						step="1"
						value={published}
						onChange={({ target }) => setPublished(parseInt(target.value, 10))}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
