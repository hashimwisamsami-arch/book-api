const express = require("express");

const router = express.Router();
const { verfiyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

//HTTP Methods

// api/books
router.route("/").get(getAllBooks).post(verfiyTokenAndAdmin, createBook);

// api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verfiyTokenAndAdmin, updateBook)
  .delete(verfiyTokenAndAdmin, deleteBook);

module.exports = router;
