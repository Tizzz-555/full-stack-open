import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "./../reducers/anecdoteReducer";

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

	const vote = (id) => {
		dispatch(voteAnecdote(id));
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => vote(anecdote.id)}
				/>
			))}
		</div>
	);
};

export default AnecdoteList;
