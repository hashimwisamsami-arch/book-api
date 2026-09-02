const express = require("express");
const connectToDB = require("./config/db");
require("dotenv").config();
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");

//Connection to DB
connectToDB();
//Init App
const app = express();

//Applay Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.set("view engine", "ejs");

//Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/password", require("./routes/password"));

//Error Handler

app.use(notFound);
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  ),
);
