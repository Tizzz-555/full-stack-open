const Filter = ({ newFilter, setNewFilter }) => {
	const handleFilter = (event) => {
		setNewFilter(event.target.value);
	};

	return (
		<div>
			filter shown with: <input value={newFilter} onChange={handleFilter} />
		</div>
	);
};

export default Filter;
