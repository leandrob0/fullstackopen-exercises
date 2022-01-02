const Countries = (props) => {
  const { countries } = props;

  return (
    <>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length !== 1 ? (
        countries.map((val) => <p key={val.name.common}>{val.name.common}</p>)
      ) : (
        <>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital[0]}</p>
          <p>Population: {countries[0].population}</p>
          <h3>Languages: </h3>
          <ul>
            {Object.keys(countries[0].languages).map((val) => {
              return (
                <li key={countries[0].languages[val]}>
                  {countries[0].languages[val]}
                </li>
              );
            })}
          </ul>
          <img src={countries[0].flags.png} alt="Flag of the country" />
        </>
      )}
    </>
  );
};

export default Countries;
