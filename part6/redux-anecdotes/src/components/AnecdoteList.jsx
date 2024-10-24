import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "./../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div>
			{anecdote.content}
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	);
};

const AnecdoteList = () => {
	const anecdotes = useSelector((state) =>
		state.anecdotes
			.filter((a) => a.content.includes(state.filter))
			.sort((a, b) => b.votes - a.votes)
	);
	const dispatch = useDispatch();

	const vote = (anecdote) => {
		const id = anecdote.id;
		dispatch(voteAnecdote(anecdote));
		const anecdoteToVote = anecdotes.find((a) => a.id === id);
		dispatch(setNotification(`you voted "${anecdoteToVote.content}"`, 2));
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => vote(anecdote)}
				/>
			))}
		</div>
	);
};

export default AnecdoteList;
