import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		setAnecdotes(state, action) {
			return action.payload;
		},
		createAnecdote(state, action) {
			state.push(action.payload);
		},
		voteAnecdote(state, action) {
			const id = action.payload;
			const anecdoteToVote = state.find((a) => a.id === id);
			const votedAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1,
			};
			return state.map((a) => (a.id !== id ? a : votedAnecdote));
		},
	},
});

export const { setAnecdotes, createAnecdote, voteAnecdote } =
	anecdoteSlice.actions;

export const fetchAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export default anecdoteSlice.reducer;
