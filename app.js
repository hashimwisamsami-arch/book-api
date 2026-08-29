const express = require("express");
const mongoose = require("mongoose");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");

//Connection to DB
mongoose
  .connect("mongodb://localhost/BookApi")
  .then(() => console.log("Connected To MongoDB..."))
  .catch((error) => console.log("Connection failed to MongoDB!", error));

//Init App
const app = express();

//Applay Middlewares
app.use(express.json());

//Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);

// Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
