import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const createRecord = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const updateRecord = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

const deleteRecord = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};
export default { getAll, createRecord, updateRecord, deleteRecord };
