const express = require("express");

const router = express.Router();
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");
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

//HTTP Methods

/**
 * @desc Get All books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

/**
 * @desc Create book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", (req, res) => {
  const { error } = validateCreateBook(req.body);
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

/**
 * @desc Update book
 * @route /api/books/:id
 * @method PUT
 * @access public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json({ message: "book has been updated" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

/**
 * @desc Delete book
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */

router.delete("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json({ message: "book has been deleted" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

module.exports = router;
