const express = require("express");

const {
  verfiyTokenAndAuthorization,
  verfiyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/usersController");
const router = express.Router();

// api/users
router.get("/", verfiyTokenAndAdmin, getAllUsers);

// api/users/:id
router
  .route(":id")
  .put(verfiyTokenAndAuthorization, updateUser)
  .get(verfiyTokenAndAuthorization, getUserById)
  .delete(verfiyTokenAndAuthorization, deleteUser);

module.exports = router;
