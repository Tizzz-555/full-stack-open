import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Filter = ({ newFilter, handleFilter }) => {
	return (
		<div>
			filter shown with: <input value={newFilter} onChange={handleFilter} />
		</div>
	);
};

const PersonForm = (props) => {
	const {
		addContact,
		newName,
		newNumber,
		handleNameInputChange,
		handleNumberInputChange,
	} = props;
	return (
		<form onSubmit={addContact}>
			<div>
				name:{" "}
				<input value={newName} onChange={handleNameInputChange} required />
			</div>
			<div>
				number:{" "}
				<input value={newNumber} onChange={handleNumberInputChange} required />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = ({ persons, newFilter }) => {
	console.log(persons);
	return (
		<div>
			{persons
				.filter((p) => p.name.toLowerCase().includes(newFilter.toLowerCase()))
				.map((p) => {
					return (
						<div key={p.id}>
							{p.name} {p.number}
						</div>
					);
				})}
		</div>
	);
};
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	const hook = () => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	};

	useEffect(hook, []);

	const handleNameInputChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberInputChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilter = (event) => {
		setNewFilter(event.target.value);
	};

	const addContact = (event) => {
		event.preventDefault();
		if (
			persons.every(
				(currentValue) =>
					currentValue.name.toLowerCase() !== newName.toLowerCase()
			)
		) {
			const nameObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			};
			personService.create(nameObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
			});
		} else {
			alert(`${newName} is already added to phonebook`);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter newFilter={newFilter} handleFilter={handleFilter} />
			<h3>Add a new</h3>
			<PersonForm
				addContact={addContact}
				newName={newName}
				handleNameInputChange={handleNameInputChange}
				newNumber={newNumber}
				handleNumberInputChange={handleNumberInputChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} newFilter={newFilter} />
		</div>
	);
};

export default App;
