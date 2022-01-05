import '../styles/Countries.css'
import { useState , useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const SingleCountry = (props) => {
  const { name, capital, population, languages, flag } = props;
  const [weather, setWeather] = useState({
    temp: 0,
    wind: 0
  })

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        const data = response.data;
        const obj = {
          temp: data.main.temp,
          wind: data.wind.speed
        }
        setWeather(obj);
      })

  }, [capital])

  return (
    <>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h3>Languages: </h3>
      <ul>
        {Object.keys(languages).map((val) => {
          return <li key={languages[val]}>{languages[val]}</li>;
        })}
      </ul>
      <img src={flag} alt="Flag of the country" />
      <h3>Weather in: {capital}</h3>
      <p>Temperature: {weather.temp}°C</p>
      <p>Wind: {weather.wind} KMh</p>
    </>
  );
};

const MultipleCountries = ({ countries, onClick }) => {
  return (
    <>
      {countries.map((val) => {
        return (
          <div key={val.name.common} className="button-p">
            <p className='country'>{val.name.common}</p>
            <button onClick={onClick} className='button' type='button'>Show</button>
          </div>
        );
      })}
    </>
  );
};

const Countries = ({ countries, onClick }) => {
  return (
    <>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length !== 1 ? (
        <MultipleCountries countries={countries} onClick={onClick} />
      ) : (
        <SingleCountry
          name={countries[0].name.common}
          capital={(countries[0].capital === undefined) ? 'Unknown' : countries[0].capital[0]}
          population={countries[0].population}
          languages={countries[0].languages}
          flag={countries[0].flags.png}
        />
      )}
    </>
  );
};

export default Countries;
