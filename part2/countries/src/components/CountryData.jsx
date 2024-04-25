import { useEffect, useState } from "react";
import "../App.css";
import countriesService from "../services/countries";

const CountryData = ({ country, hasButton, singleCountry }) => {
	const [isVisible, setIsVisible] = useState(!hasButton);
	const [weather, setWeather] = useState();

	const handleClick = () => {
		setIsVisible(!isVisible);
	};

	useEffect(() => {
		if (singleCountry) {
			const lat = country.capitalInfo.latlng[0];
			const lon = country.capitalInfo.latlng[1];

			countriesService
				.getWeather(lat, lon)
				.then((r) => {
					const celsius = Math.round(r.main.temp - 273);
					setWeather({
						temperature: celsius,
						wind: r.wind.speed,
						icon: r.weather[0].icon,
					});
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [singleCountry]);

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
					{weather && (
						<>
							<p>Temperature: {weather.temperature}° (Celsius)</p>
							<img
								src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
								style={{ background: "deepskyblue" }}
							/>
							<p>Wind: {weather.wind} m/s</p>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default CountryData;
