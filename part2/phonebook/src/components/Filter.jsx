const Filter = ({ newFilter, setNewFilter }) => {
	const handleFilter = (event) => {
		setNewFilter(event.target.value);
	};

	return (
		<div>
			Find contact: <input value={newFilter} onChange={handleFilter} />
		</div>
	);
};

export default Filter;
