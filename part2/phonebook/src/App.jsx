import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleNameInputChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberInputChange = (event) => {
		setNewNumber(event.target.value);
	};
	// const dummy = ["Mattia", "Marco", "davide", "matteo"];

	const addContact = (event) => {
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
				number: newNumber,
			};
			setPersons(persons.concat(nameObject));
			setNewName("");
			setNewNumber("");
		} else {
			alert(`${newName} is already added to phonebook`);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addContact}>
				<div>
					name:{" "}
					<input value={newName} onChange={handleNameInputChange} required />
				</div>
				<div>
					number:{" "}
					<input
						value={newNumber}
						onChange={handleNumberInputChange}
						required
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map((p) => {
					return (
						<div key={p.id}>
							{p.name} {p.number}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default App;
