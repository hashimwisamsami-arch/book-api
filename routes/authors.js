const express = require("express");
const Joi = require("joi");

const router = express.Router();
const { Author } = require("../models/Author");

const authors = [
  {
    id: 1,
    firstName: "Jimmy",
    lastName: "cool",
    nationality: "USA",
    image: "default-image.png",
  },
  {
    id: 2,
    firstName: "Kenny",
    lastName: "MK",
    nationality: "USA",
    image: "default-image.png",
  },
];

//HTTP Methods

/**
 * @desc Get All authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
  res.status(200).json(authors);
});

/**
 * @desc Get authors by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
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
 * @access public
 */

router.post("/", async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save();
    res.status(201).json({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
  }
});

/**
 * @desc Update author
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json({ message: "author is updated" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

/**
 * @desc Delete author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json({ message: "author is deleted" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(2).max(50).required(),
    image: Joi.string().trim(),
  });
  return schema.validate(obj);
}

function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(2).max(50),
    image: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = router;
