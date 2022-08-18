const express = require("express");
const cors = require("cors");

const app = express();
const logger = require("./loggerMiddleware");

app.use(cors());
app.use(express.json());
app.use(logger);

let notes = [
  {
    id: 1,
    content: "Instalar Node js",
    date: "2022-10-20",
    important: true,
  },
  {
    id: 2,
    content: "Repasar Java",
    date: "2022-09-20",
    important: false,
  },
  {
    id: 3,
    content: "Hacer retos de backend",
    date: "2022-12-20",
    important: true,
  },
  {
    id: 4,
    content: "Mirar youtube para aprender C#",
    date: "2022-08-20",
    important: true,
  },
  {
    id: 5,
    content: "Ir a comprar pan",
    date: "2022-08-20",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hola Mundo</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  if (!note || !note.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const maxId = Math.max(...notes.map((note) => note.id));

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== "undefined" ? note.important : false,
  };
  notes.push(newNote);
  response.status(201).json(newNote);
}),
  (error) => {
    console.log(error);
  };

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {});

app.use((request, response) => {
  response.status(404).json({ error: "Not found" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
