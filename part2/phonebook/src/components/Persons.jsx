import personService from "../services/persons";

const Persons = ({
	persons,
	newFilter,
	setPersons,
	setOkMessage,
	setErrorMessage,
}) => {
	const deleteContact = (id) => {
		const contact = persons.find((p) => p.id === id);

		if (window.confirm(`Delete '${contact.name}'?`)) {
			personService
				.deleteRecord(id)
				.then((returnedPerson) => {
					setPersons(persons.filter((p) => p.id !== id));
					setOkMessage(`Deleted ${returnedPerson.name}`);
					setTimeout(() => {
						setOkMessage(null);
					}, 2000);
				})
				.catch((error) => {
					console.error("Error deleting person:", error);
					setErrorMessage(
						`Could not delete the contact '${contact.name}'. Please try again.`
					);
					setTimeout(() => {
						setErrorMessage(null);
					}, 2000);
				});
		}
	};
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

export default Persons;
