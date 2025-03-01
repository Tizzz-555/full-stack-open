import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { buttonStyle } from "../App";
import { useState } from "react";

const Books = () => {
	const [genre, setGenre] = useState(null);
	const { loading, error, data } = useQuery(ALL_BOOKS, {
		variables: { genre },
	});

	if (loading) {
		return <div>loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const books = data.allBooks;

	const booksGenres = books.reduce((acc, book) => {
		book.genres.forEach((genre) => {
			if (!acc.includes(genre)) {
				acc.push(genre);
			}
		});
		return acc;
	}, []);

	return (
		<div>
			<h2>books</h2>
			{genre && (
				<p>
					In genre
					<strong> {genre}</strong>
				</p>
			)}
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			{booksGenres.map((g, index) => (
				<button
					key={index}
					style={buttonStyle}
					value={g}
					onClick={({ target }) => setGenre(target.value)}
				>
					{g}
				</button>
			))}
			<button
				style={buttonStyle}
				value={null}
				onClick={({ target }) => setGenre(target.value)}
			>
				all genres
			</button>
		</div>
	);
};

export default Books;
