import personService from "../services/persons";

const PersonForm = (props) => {
	const {
		newName,
		setNewName,
		newNumber,
		setNewNumber,
		persons,
		setPersons,
		addedMessage,
		setAddedMessage,
	} = props;

	const handleNameInputChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberInputChange = (event) => {
		setNewNumber(event.target.value);
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

		if (!duplicatedPerson) {
			personService.create(nameObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
				setAddedMessage(`Added ${returnedPerson.name}`);
				setTimeout(() => {
					setAddedMessage(null);
				}, 2000);
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

export default PersonForm;
