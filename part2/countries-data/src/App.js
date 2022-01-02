import axios from "axios";
import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import CountrySearch from "./components/CountrySearch";

const App = () => {
  const [inputVal, setInputVal] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (inputVal !== "") {
      const filter = countries.filter((val) => {
        return val.name.common.toUpperCase().includes(inputVal.toUpperCase());
      });
      setFiltered(filter);
    } else {
      setFiltered([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVal]);

  const changeHandler = (e) => setInputVal(e.target.value);

  return (
    <div>
      <CountrySearch changeHandler={changeHandler} val={inputVal} />
      <Countries countries={filtered} />
    </div>
  );
};

export default App;
