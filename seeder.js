const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books, authors } = require("./data");
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

//Import Author
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Authors Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Remove Authors
const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("Authors Deleted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-import-authors") {
  importAuthors();
} else if (process.argv[2] === "-remove-authors") {
  removeAuthors();
}
