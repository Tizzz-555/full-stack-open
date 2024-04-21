import { useState, useEffect } from "react";
import "./App.css";
import countriesService from "./services/countries";

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
		if (countries.length > 0) {
			setFilteredCountries(
				countries
					.map((c) => ({
						name: c.name.common,
						capital: c.capital,
						area: c.area,
						languages: c.languages ? Object.values(c.languages) : [],
						flag: c.flags["svg"],
					}))
					.filter((c) => c.name.toLowerCase().includes(value.toLowerCase()))
			);
		}
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
				filteredCountries.map((country, index) => {
					return <div key={index}>{country.name}</div>;
				})
			) : (
				filteredCountries.length === 1 && (
					<>
						<h2>{filteredCountries[0].name}</h2>
						<p>Capital: {filteredCountries[0].capital}</p>
						<p>Area: {filteredCountries[0].area}</p>
						<h4>Languages:</h4>
						<ul>
							{filteredCountries[0].languages.map((language, index) => {
								return <li key={index}>{language}</li>;
							})}
						</ul>
						<img
							src={filteredCountries[0].flag}
							width="10%"
							style={{ border: "1px solid black" }}
						></img>
					</>
				)
			)}
		</div>
	);
};
export default App;
