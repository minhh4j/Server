const User = require("../models/userModule");
const CustomError = require("../utils/customError");

exports.registerUserSarvice = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new CustomError("Email already registered", 400);

  try {
    const user = await User.create({ username, email, password });
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    };
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      throw new CustomError(
        `The ${field} "${err.keyValue[field]}" is already taken. Please use a different one.`,
        400
      );
    }
    throw new CustomError(
      "Something went wrong during registration. Please try again later.",
      500
    );
  }
};
