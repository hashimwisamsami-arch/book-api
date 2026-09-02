const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

/**
 * @desc Get All authors
 * @route /api/authors
 * @method GET
 * @access public
 */

const getAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  const authorPerPage = 2;
  const authorList = await Author.find()
    .skip((pageNumber - 1) * authorPerPage)
    .limit(authorPerPage);
  res.status(200).json(authorList);
});

/**
 * @desc Get authors by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

/**
 * @desc Create author
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
const createAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });
  const result = await author.save();
  res.status(201).json({ message: result });
});

/**
 * @desc Update author
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */
const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true },
  );
  res.status(200).json({ author });
});

/**
 * @desc Delete author
 * @route /api/authors/:id
 * @method DELETE
 * @access private (only admin)
 */
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "author is deleted" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
