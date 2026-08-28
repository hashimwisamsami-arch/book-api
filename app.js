const express = require("express");

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

//HTTP Methods
app.get("/", (req, res) => {
  res.send("Welcome to express JS");
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

// Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
