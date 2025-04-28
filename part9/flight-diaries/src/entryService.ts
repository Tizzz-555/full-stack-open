import axios from "axios";
import {
	DiaryEntry,
	NewDiaryEntry,
} from "../../../../full-stack-open-backend/playground/flight-diaries/src/types";

const baseUrl = "http://localhost:3000/api";

export const getAllEntries = () => {
	return axios
		.get<DiaryEntry[]>(`${baseUrl}/diaries`)
		.then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
	return axios
		.post<DiaryEntry>(`${baseUrl}/diaries`, object)
		.then((response) => response.data);
};
