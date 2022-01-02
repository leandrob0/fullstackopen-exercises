const CountrySearch = (props) => {
  const { changeHandler, val } = props;

  return (
    <div>
      <p>Find countries: </p>
      <input onChange={changeHandler} value={val} />
    </div>
  );
};

export default CountrySearch;
