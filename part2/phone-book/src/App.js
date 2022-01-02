import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setNewFiltered] = useState({ array: persons, value: "" });

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    setNewFiltered({ array: persons, value: "" });
  }, [persons]);

  const submitForm = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already registered.`);
      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson = persons.concat({ name: newName, number: newNumber });

    setPersons(newPerson);
    setNewName("");
    setNewNumber("");
  };

  const filterPersons = (e) => {
    if (e.target.value !== "") {
      setNewFiltered({
        array: persons.filter((val) =>
          val.name.toUpperCase().includes(e.target.value.toUpperCase())
        ),
        value: e.target.value,
      });
    } else {
      setNewFiltered({ array: persons, value: e.target.value });
    }
  };

  const nameChangeHandler = (e) => setNewName(e.target.value);
  const numberChangeHandler = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filtered.value} onChange={filterPersons} />
      <Form
        submitForm={submitForm}
        valueName={newName}
        changeName={nameChangeHandler}
        valueNumber={newNumber}
        changeNumber={numberChangeHandler}
      />
      <Numbers persons={filtered.array} />
    </div>
  );
};

export default App;
