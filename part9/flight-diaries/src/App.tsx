import { useEffect, useState } from "react";
import { getAllEntries, createEntry } from "./entryService";
import {
	DiaryEntry,
	Visibility,
	Weather,
} from "../../../../full-stack-open-backend/playground/flight-diaries/src/types";

function App() {
	const [entries, setEntries] = useState<DiaryEntry[]>([]);
	const [date, setDate] = useState("");
	const [visibility, setVisibility] = useState("");
	const [weather, setWeather] = useState("");
	const [comment, setComment] = useState("");

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
		}).then((data) => setEntries(entries.concat(data)));
		setDate("");
		setVisibility("");
		setWeather("");
		setComment("");
	};

	return (
		<div>
			<h4>Add new entry</h4>
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
