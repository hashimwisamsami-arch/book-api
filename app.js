const express = require("express");
const Joi = require("joi");

//Applay Middlewares

const books = [
  {
    id: 1,
    title: "black swan",
    author: "Jimmy",
    description: "About black swan",
    price: 10,
    cover: "soft cover",
  },
  {
    id: 2,
    title: "music",
    author: "Jimmy",
    description: "About music",
    price: 10,
    cover: "soft cover",
  },
];

//Init App
const app = express();
app.use(express.json());

//HTTP Methods

app.get("/api/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

app.post("/api/books", (req, res) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(300).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };
  books.push(book);
  res.status(201).json({ message: book });
});

// Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
