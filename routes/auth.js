const express = require("express");
const { registerNewUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// api/auth/register
router.post("/register", registerNewUser);

// api/auth/login
router.post("/login", loginUser);

module.exports = router;
