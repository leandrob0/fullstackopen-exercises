import React, { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import personsBack from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setNewFiltered] = useState({ array: persons, value: "" });

  useEffect(() => {
    personsBack
      .getAll()
      .then((allPersons) => setPersons(allPersons))
      .catch((err) => console.log("request failed 1"));
  }, []);

  useEffect(() => {
    setNewFiltered({ array: persons, value: "" });
  }, [persons]);

  const submitForm = (e) => {
    e.preventDefault();

    const found = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());

    if (found) {
      const id = found.id;
      if (
        window.confirm(
          `${newName} already exists. Do you wanna replace the old number with a new one?`
        )
      ) {
        personsBack
          .updatePhoneNumber(id, { name: newName, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
          })
          .catch((err) => console.log("reques failed 4", err));
      }
    } else {
      personsBack
        .createNew({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => console.log("request failed 2", err));
    }

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

  const deletePerson = (e) => {
    if (window.confirm(`Delete ${e.target.parentNode.innerText}?`)) {
      const id = e.target.parentNode.parentNode.id;

      personsBack
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== Number(id)));
        })
        .catch((err) => console.log("request failed 3", err));
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
      <Numbers persons={filtered.array} onclick={deletePerson} />
    </div>
  );
};

export default App;
