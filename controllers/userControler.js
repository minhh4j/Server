const asyncHandler = require("../middlewares/asyncHandler");
const { registerUserSarvice, loginUserService } = require("../services/userService");
const CustomError = require("../utils/customError");
const {registerValidation, loginValidation} = require("../utils/validators");

// register user

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

//login user

exports.loginUser = asyncHandler(async (req, res) => { 
  const { email, password } = req.body; 
  console.log('email',email,'password',password);
  

  const { error } = loginValidation.validate({ email, password });
  if (error) throw new CustomError(error.details[0].message, 400);

  const { accessToken, refreshToken, user } = await loginUserService({
    email,
    password,
  });

  // Setting cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 5 * 60 * 1000, // 5 minutes (in milliseconds)
    path: "/",
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (in milliseconds)
    path: "/",
    sameSite: "none",
  });

  // Sending response
  res.status(200).json({
    message: `🎉 Login successful! Welcome back, 👋 !`,
    user,
  });
});
