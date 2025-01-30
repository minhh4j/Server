const asyncHandler = require("../middlewares/asyncHandler");
const { registerUserSarvice } = require("../services/userService");
const CustomError = require("../utils/customError");
const registerValidation = require("../utils/validators");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const { error } = registerValidation.validate({
    username,
    email,
    password,
    confirmPassword,
  });
  if (error) throw new CustomError(error.details[0].message, 400);
  const User = await registerUserSarvice({ username, email, password });

  res.status(201).json({
    message: `🎉 User ${username} registered successfully!`,
    User,
  });
});
