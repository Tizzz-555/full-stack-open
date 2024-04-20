import "./App.css";
import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [addedMessage, setAddedMessage] = useState(null);

	const hook = () => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	};

	useEffect(hook, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={addedMessage} />
			<Filter newFilter={newFilter} setNewFilter={setNewFilter} />
			<h3>Add a new</h3>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				addedMessage={addedMessage}
				setAddedMessage={setAddedMessage}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={persons}
				newFilter={newFilter}
				setPersons={setPersons}
			/>
		</div>
	);
};

export default App;
