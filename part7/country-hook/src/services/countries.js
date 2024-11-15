import axios from "axios";
const countriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const countryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const getCountries = () => {
  const request = axios.get(countriesUrl);
  return request.then((response) => response.data);
};

const getCountry = (country) => {
  const request = axios.get(`${countryUrl}/${country}`);
  return request
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};
export default { getCountries, getCountry };
