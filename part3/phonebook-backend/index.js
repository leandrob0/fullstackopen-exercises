require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token('posted', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :posted'));
app.use(express.json());

// Get complete phonebook
app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  })
});

// Get info of phonebook
app.get("/info", (req, res) => {
  Person.find({}).then(persons => {
    res.send(`Phonebook has info of ${persons.length} people <br> ${new Date()}`)
  })
});

// Get specific person
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    response.json(person)
  })
});

// Delete specific person
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id.toString();
  phonebook = phonebook.filter((person) => person.id.toString() !== id);

  res.json(phonebook);
});

// Add a new person
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } 

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson);
  })
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
