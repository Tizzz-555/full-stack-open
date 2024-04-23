import { useState } from "react";
import "../App.css";

const CountryData = ({ country, hasButton }) => {
	const [isVisible, setIsVisible] = useState(!hasButton);

	const handleClick = () => {
		setIsVisible(!isVisible);
	};
	return (
		<div>
			{hasButton && (
				<>
					<span>{country.name.common}</span>
					<button onClick={handleClick} className="custom-button">
						{isVisible ? "Hide" : "Show"} Details
					</button>
				</>
			)}
			{isVisible && (
				<>
					<h2>{country.name.common}</h2>
					<p>Capital: {country.capital}</p>
					<p>Area: {country.area}</p>
					<h4>Languages:</h4>
					<ul>
						{country.languages &&
							Object.values(country.languages).map((language, index) => (
								<li key={index}>{language}</li>
							))}
					</ul>
					<img
						src={country.flags.svg}
						width="10%"
						style={{ border: "1px solid black" }}
					/>
					<h2>Weather in {country.capital}</h2>
				</>
			)}
		</div>
	);
};

export default CountryData;
