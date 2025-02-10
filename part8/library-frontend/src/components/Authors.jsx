import { useEffect, useState } from "react";
import { ALL_AUTHORS, ADD_BIRTHYEAR } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import Select from "react-select";

const Authors = ({ setError }) => {
	const [addBirthyear] = useMutation(ADD_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join("\n");
			setError(messages);
		},
	});

	const [name, setName] = useState("");
	const [setBornTo, setSetBornTo] = useState("");

	useEffect(() => {}, [name]);
	const { loading, error, data } = useQuery(ALL_AUTHORS, {
		pollInterval: 2000,
	});

	if (loading) {
		return <div>loading...</div>;
	}

	const authors = data.allAuthors;

	const submit = async (event) => {
		event.preventDefault();

		addBirthyear({ variables: { name, setBornTo } });
		setSetBornTo("");
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const selectOptions = authors.map((a) => {
		return {
			value: a.name,
			label: a.name,
		};
	});

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<div>
					<Select
						options={selectOptions}
						onChange={({ value }) => setName(value)}
					></Select>
				</div>
				<div>
					born
					<input
						value={setBornTo}
						onChange={({ target }) => setSetBornTo(parseInt(target.value, 10))}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
