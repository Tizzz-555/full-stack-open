import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";
import { removeNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const add = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(createAnecdote(newAnecdote));
		dispatch(createNotification(`you added "${content}"`));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	};
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={add}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
