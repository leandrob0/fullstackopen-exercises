import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import Success from "./components/Success";
import personsBack from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setNewFiltered] = useState({ array: persons, value: "" });
  const [message, setMessage] = useState({
    msg: "",
    type: 0,
  });

  useEffect(() => {
    personsBack
      .getAll()
      .then((allPersons) => setPersons(allPersons))
      .catch((err) => console.log("request failed 1"));
  }, []);

  useEffect(() => {
    setNewFiltered({ array: persons, value: "" });
  }, [persons]);

  const messageHandler = (msg, type) => {
    setMessage({
      msg: msg,
      type: type
    });
    setTimeout(() => {
      setMessage({
        msg: '',
        type: 0
      });
    }, 5000);
  }

  const submitForm = (e) => {
    e.preventDefault();

    const found = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (found) {
      const id = found.id;
      if (
        window.confirm(
          `${newName} already exists. Do you wanna replace the old number with a new one?`
        )
      ) {
        personsBack
          .updatePhoneNumber(id, { name: newName, number: newNumber })
          .then((returnedPersons) => {
            setPersons(returnedPersons);
            messageHandler(`${newName} number updated successfully!`, 0);
          })
          .catch((err) => {
            console.log(err);
            messageHandler(`Sorry. ${newName} has already been deleted from the server.`, 1);
          });
      }
    } else {
      personsBack
        .createNew({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          const newArray = persons.concat(returnedPerson);
          setPersons(newArray);
          messageHandler(`${newName} added successfully!`, 0);
          setTimeout(() => {
            setNewName("");
            setNewNumber("");
          }, 500);
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
          setPersons(response);
        })
        .catch((err) => {
          console.log(err);
          messageHandler(`Sorry. the person has already been deleted from the server. Refresh the page`, 1)
        });
    }
  };

  const nameChangeHandler = (e) => setNewName(e.target.value);
  const numberChangeHandler = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filtered.value} onChange={filterPersons} />
      <Success msg={message} />
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