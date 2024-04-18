import "./App.css";
import { useState, useEffect } from "react";
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
				<button className="custom-button" type="submit">
					add
				</button>
			</div>
		</form>
	);
};

const Persons = ({ persons, newFilter, deleteContact }) => {
	return (
		<div>
			{persons
				.filter((p) => p.name.toLowerCase().includes(newFilter.toLowerCase()))
				.map((p) => {
					return (
						<div key={p.id}>
							{p.name} {p.number}
							<button
								onClick={() => deleteContact(p.id)}
								className="custom-button"
							>
								Delete
							</button>
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
		const nameObject = {
			name: newName,
			number: newNumber,
		};
		const duplicatedPerson = persons.find(
			(p) => p.name.toLowerCase() === newName.toLowerCase()
		);

		console.log(duplicatedPerson);
		if (!duplicatedPerson) {
			personService.create(nameObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
			});
		} else {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with new one?`
				)
			) {
				personService
					.update(duplicatedPerson.id, nameObject)
					.then((returnedPerson) => {
						setPersons(
							persons.map((p) =>
								p.id !== duplicatedPerson.id ? p : returnedPerson
							)
						);
					})
					.catch((error) => {
						alert(
							`the person '${duplicatedPerson.name}' was already deleted from server`
						);
						setPersons(persons.filter((p) => p.id !== id));
					});
			}
		}
	};

	const deleteContact = (id) => {
		const contact = persons.find((p) => p.id === id);

		if (window.confirm(`Delete '${contact.name}'?`)) {
			personService
				.deleteRecord(id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== id));
				})
				.catch((error) => {
					console.error("Error deleting person:", error);
					alert(
						`Could not delete the contact '${contact.name}'. Please try again.`
					);
				});
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
			<Persons
				persons={persons}
				newFilter={newFilter}
				deleteContact={deleteContact}
			/>
		</div>
	);
};

export default App;
