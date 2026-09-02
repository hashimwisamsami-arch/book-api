const asyncHandler = require("express-async-handler");

/**
 * @desc Get Forgot Password view
 * @route /password/forgot-password
 * @method GET
 * @access public
 */

module.exports.getForgotPasswordView = asyncHandler((req, res) => {
  res.render("forgot-password");
});
