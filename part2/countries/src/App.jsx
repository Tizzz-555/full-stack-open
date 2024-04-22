import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import CountryData from "./components/CountryData";

const App = () => {
	const [value, setValue] = useState("");
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);

	useEffect(() => {
		countriesService.getAll().then((allCountries) => {
			setCountries(allCountries);
		});
	}, []);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	useEffect(() => {
		setFilteredCountries(
			countries.filter((c) =>
				c.name.common.toLowerCase().includes(value.toLowerCase())
			)
		);
	}, [value, countries]);

	return (
		<div>
			find countries{" "}
			<input
				placeholder="Insert country"
				value={value}
				onChange={handleChange}
			></input>
			{value.length === 0 ? null : filteredCountries.length > 10 ? (
				<div>Too many matches, specify another filter</div>
			) : filteredCountries.length > 1 && filteredCountries.length <= 10 ? (
				filteredCountries.map((country, index) => (
					<CountryData key={index} country={country} hasButton={true} />
				))
			) : (
				filteredCountries.length === 1 && (
					<CountryData country={filteredCountries[0]} hasButton={false} />
				)
			)}
		</div>
	);
};
export default App;
