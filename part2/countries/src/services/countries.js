import axios from "axios";
const countriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_API_KEY;

const getCountries = () => {
	const request = axios.get(countriesUrl);
	return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
	const request = axios.get(
		`${weatherUrl}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
	);
	return request.then((response) => response.data);
};
export default { getCountries, getWeather };
