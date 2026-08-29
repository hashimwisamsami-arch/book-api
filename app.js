const express = require("express");
const booksPath = require("./routes/books");
//Init App
const app = express();

//Applay Middlewares
app.use(express.json());

//Routes
app.use("/api/books", booksPath);

// Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
