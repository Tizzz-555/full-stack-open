import personService from "../services/persons";

const Persons = ({ persons, newFilter, setPersons }) => {
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
