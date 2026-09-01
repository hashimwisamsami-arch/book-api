const { Book } = require("./models/Book");
const { books } = require("./data");
const connectToDB = require("./config/db");
require("dotenv").config();

// Connection to DB
connectToDB();

//Import Books
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Remove Books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books Deleted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  importBooks();
} else if (process.argv[2] === "-remove") {
  removeBooks();
}
