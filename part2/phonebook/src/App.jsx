import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");

	const handleInputChange = (event) => {
		setNewName(event.target.value);
	};

	// const dummy = ["Mattia", "Marco", "davide", "matteo"];

	const addName = (event) => {
		event.preventDefault();
		if (
			persons.every(
				(currentValue) =>
					currentValue.name.toLowerCase() !== newName.toLowerCase()
			)
		) {
			const nameObject = {
				id: persons.length + 1,
				name: newName,
			};
			setPersons(persons.concat(nameObject));
			setNewName("");
		} else {
			alert(`${newName} is already added to phonebook`);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleInputChange} />
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map((p) => {
					return <div key={p.id}>{p.name}</div>;
				})}
			</div>
		</div>
	);
};

export default App;
