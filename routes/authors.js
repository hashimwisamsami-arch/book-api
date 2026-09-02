const express = require("express");

const router = express.Router();
const { verfiyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorsController");

//HTTP Methods

// api/authors
router.route("/").get(getAllAuthors).post(verfiyTokenAndAdmin, createAuthor);

// api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(verfiyTokenAndAdmin, updateAuthor)
  .delete(verfiyTokenAndAdmin, deleteAuthor);

module.exports = router;
