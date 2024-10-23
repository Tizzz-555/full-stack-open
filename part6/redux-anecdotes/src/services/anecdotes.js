import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

// the content arrives from f.e. through reducer
const createNew = async (content) => {
	// we build the object we wanna store
	const obj = { content, votes: 0 };
	// the post req stores it in b.e. we then save the response in a big object
	const response = await axios.post(baseUrl, obj);
	// we return the data object of the big object that will be stored into "newAnecdote" and then passed to the reducer inside the payload of the action creators
	return response.data;
};

const update = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject);
	return response.data;
};
export default { getAll, createNew, update };
