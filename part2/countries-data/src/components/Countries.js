import '../styles/Countries.css'

const SingleCountry = (props) => {
  const { name, capital, population, languages, flag } = props;

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
