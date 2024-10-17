import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		setAnecdotes(state, action) {
			return action.payload;
		},
		createAnecdote(state, action) {
			const content = action.payload;
			state.push({
				content,
				id: getId(),
				votes: 0,
			});
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
export default anecdoteSlice.reducer;
