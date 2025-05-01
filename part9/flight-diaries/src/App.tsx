import { useEffect, useState } from "react";
import { getAllEntries, createEntry } from "./entryService";
import {
	DiaryEntry,
	Visibility,
	Weather,
	BackendErrorResponse,
} from "../../../../full-stack-open-backend/playground/flight-diaries/src/types";
import Notification from "./components/Notification";
import axios from "axios";
function App() {
	const [entries, setEntries] = useState<DiaryEntry[]>([]);
	const [date, setDate] = useState("");
	const [visibility, setVisibility] = useState("");
	const [weather, setWeather] = useState("");
	const [comment, setComment] = useState("");
	const [okMessage, setOkMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		getAllEntries().then((entries) => setEntries(entries));
	}, []);

	const entryCreation = (event: React.SyntheticEvent) => {
		event.preventDefault();
		createEntry({
			date,
			visibility: visibility as Visibility,
			weather: weather as Weather,
			comment,
		})
			.then((data) => {
				setEntries(entries.concat(data));
				setOkMessage(`New entry added: ${data.date}`);
				setTimeout(() => {
					setOkMessage("");
				}, 2000);
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					const data = error.response?.data as BackendErrorResponse;
					const messages = data?.error?.map((e) => e.message).join("; \n");
					setErrorMessage(
						messages || "An error occurred while creating the entry"
					);
				} else {
					setErrorMessage("An unknown error occurred");
					console.error(error);
				}
				setTimeout(() => {
					setErrorMessage("");
				}, 10000);
				setDate("");
				setVisibility("");
				setWeather("");
				setComment("");
			});
	};

	return (
		<div>
			<h4>Add new entry</h4>
			<Notification okMessage={okMessage} errorMessage={errorMessage} />
			<form onSubmit={entryCreation}>
				<div>
					date:
					<input
						value={date}
						onChange={(event) => setDate(event.target.value)}
					/>
				</div>
				<div>
					visibility:
					<input
						value={visibility}
						onChange={(event) => setVisibility(event.target.value)}
					/>
				</div>
				<div>
					weather:
					<input
						value={weather}
						onChange={(event) => setWeather(event.target.value)}
					/>
				</div>
				<div>
					comment:
					<input
						value={comment}
						onChange={(event) => setComment(event.target.value)}
					/>
				</div>
				<button type="submit">add</button>
			</form>
			<h4>Diary entries</h4>
			{entries.map((entry) => (
				<div key={entry.id}>
					<h5>{entry.date}</h5>
					<div> visibility: {entry.visibility}</div>
					<div>weather: {entry.weather}</div>
					<div>comment: {entry.comment}</div>
				</div>
			))}
		</div>
	);
}

export default App;
