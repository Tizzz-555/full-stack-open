import React, { useState, useEffect } from "react";
import countriesService from "./services/countries";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

// every letter input triggers a rerender above (setValue)

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  // the hook gets mounted at each re render. name changes only at the onClick inside the fetch method
  useEffect(() => {
    if (name)
      countriesService
        .getCountry(name)
        .then((c) =>
          setCountry({
            data: {
              name: c.name.common,
              capital: c.capital,
              population: c.population,
              flag: c.flags.png,
            },
            found: true,
          })
        )
        .catch((error) => {
          setCountry({ found: false });
          console.error(error);
        });
  }, [name]);
  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
