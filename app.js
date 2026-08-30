const express = require("express");
const mongoose = require("mongoose");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const dotenv = require("dotenv");
dotenv.config();

//Connection to DB
mongoose
  .connect(process.env.MONGO_URI)
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  ),
);
