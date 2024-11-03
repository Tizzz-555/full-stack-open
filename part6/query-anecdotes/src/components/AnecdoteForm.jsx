import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";
// import NotificationContext from "../NotificationContext";
// import { useContext } from "react";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
		},
	});

	const onCreate = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({ content, votes: 0 });
		// useNotificationDispatch("suxa");
		dispatch({ payload: content });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
