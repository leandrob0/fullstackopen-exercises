const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uniqid = require("uniqid");
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

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :posted'));
app.use(express.json());

// Get complete phonebook
app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

// Get info of phonebook
app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info of ${phonebook.length} people <br> ${new Date()}`
  );
});

// Get specific person
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// Delete specific person
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id.toString();
  phonebook = phonebook.filter((person) => person.id.toString() !== id);

  res.json(phonebook);
});

// Add a new person
const generateId = () => {
  return uniqid();
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else if (phonebook.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "Name already exists",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(person);
  res.json(phonebook);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});