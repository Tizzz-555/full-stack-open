import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommended = () => {
	// Add fetchPolicy to ensure fresh data on each render
	const { data: userData, loading: userLoading } = useQuery(ME, {
		fetchPolicy: "no-cache",
	});

	const favGenre = userData?.me?.favoriteGenre;

	const {
		loading: booksLoading,
		error,
		data,
	} = useQuery(ALL_BOOKS, {
		variables: { genre: favGenre },
		skip: !favGenre,
		fetchPolicy: "no-cache", // Force refetch from server
	});

	const loading = userLoading || booksLoading;

	if (loading) {
		return <div>Loading books...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!favGenre) {
		return <div>No favorite genre set for current user</div>;
	}

	const books = data.allBooks;

	return (
		<div>
			<h2>Recommendations</h2>
			<p>
				Books in your favorite genre: <strong>{favGenre}</strong>
			</p>

			{books.length === 0 ? (
				<p>No books found in your favorite genre</p>
			) : (
				<table>
					<tbody>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Published</th>
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
			)}
		</div>
	);
};

export default Recommended;
