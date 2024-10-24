import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		setAnecdotes(state, action) {
			return action.payload;
		},
		appendAnecdote(state, action) {
			state.push(action.payload);
		},
		updateAnecdote(state, action) {
			const id = action.payload.id;
			const anecdoteToVote = state.find((a) => a.id === id);
			const updatedAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1,
			};
			return state.map((a) => (a.id !== id ? a : updatedAnecdote));
		},
	},
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
	anecdoteSlice.actions;

export const fetchAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const voteAnecdote = (content) => {
	const id = content.id;
	const votedAnecdote = {
		...content,
		votes: content.votes + 1,
	};
	return async (dispatch) => {
		const updatedAnecdote = await anecdoteService.update(id, votedAnecdote);
		dispatch(updateAnecdote(updatedAnecdote));
	};
};
export default anecdoteSlice.reducer;
