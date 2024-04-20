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
	const [okMessage, setOkMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const hook = () => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	};

	useEffect(hook, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification okMessage={okMessage} errorMessage={errorMessage} />
			<Filter newFilter={newFilter} setNewFilter={setNewFilter} />
			<h3>Add a new</h3>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				okMessage={okMessage}
				setOkMessage={setOkMessage}
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={persons}
				newFilter={newFilter}
				setPersons={setPersons}
				setOkMessage={setOkMessage}
				setErrorMessage={setErrorMessage}
			/>
		</div>
	);
};

export default App;
