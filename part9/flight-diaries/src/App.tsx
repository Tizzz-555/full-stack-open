import { useEffect, useState } from "react";
import { getAllEntries } from "./entryService";
import { DiaryEntry } from "../../../../full-stack-open-backend/playground/flight-diaries/src/types";

function App() {
	const [entries, setEntries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getAllEntries().then((entries) => setEntries(entries));
	}, []);

	useEffect(() => {
		console.log(entries);
	}, [entries]);

	return (
		<div>
			{/* <form onSubmit={noteCreation}>
      {" "}
      <input
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
      />{" "}
      <button type="submit">add</button>{" "}
    </form> */}
			<h4>Diary entries</h4>
			{entries.map((entry) => (
				<div key={entry.id}>
					<h5>{entry.date}</h5>
					<div>visibility: {entry.visibility}</div>
					<div>weather: {entry.weather}</div>
				</div>
			))}
		</div>
	);
}

export default App;
