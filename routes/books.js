const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { verfiyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");

//HTTP Methods

/**
 * @desc Get All books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    let bookList;
    if (minPrice && maxPrice) {
      bookList = await Book.find({
        price: { $gte: minPrice, $lte: maxPrice },
      }).populate("author", ["_id", "firstName", "lastName"]);
    } else {
      bookList = await Book.find().populate("author", [
        "_id",
        "firstName",
        "lastName",
      ]);
    }

    res.status(200).json(bookList);
  }),
);

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  }),
);

/**
 * @desc Create book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */
router.post(
  "/",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await book.save();
    res.status(201).json({ message: result });
  }),
);

/**
 * @desc Update book
 * @route /api/books/:id
 * @method PUT
 * @access private (only admin)
 */

router.put(
  "/:id",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true },
    );

    res.status(200).json({ message: book });
  }),
);

/**
 * @desc Delete book
 * @route /api/books/:id
 * @method DELETE
 * @access private (only admin)
 */

router.delete(
  "/:id",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "book has been deleted" });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  }),
);

module.exports = router;
