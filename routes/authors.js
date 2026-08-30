const express = require("express");

const router = express.Router();
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

//HTTP Methods

/**
 * @desc Get All authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", async (req, res) => {
  try {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
  }
});

/**
 * @desc Get authors by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "author not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
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

router.put("/:id", async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
  }
});

/**
 * @desc Delete author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "author is deleted" });
    } else {
      res.status(404).json({ message: "author not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!" });
  }
});

module.exports = router;
