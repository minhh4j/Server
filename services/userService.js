const User = require("../models/userModule");
const CustomError = require("../utils/customError");
const { genarateAccessToken, genaraterefreshToken } = require("../utils/generateToken");

//register Service

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

// Login Service

exports.loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new CustomError("Invalid email or password", 401);

  if (user.isBlocked) {
    throw new CustomError(
      "❌ Your account is blocked. Please contact Admin for assistance. 📞",
      403
    );
  }

  // Validate password

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new CustomError(
      "🚫 Invalid email or password. Double-check and try again. 🛠️",
      401
    );
  }

  // Generate tokens

  const accessToken = genarateAccessToken({
    id: user._id,
    role: user.role,
    email: user.email,
  });
  const refreshToken = genaraterefreshToken({
    id: user._id,
    role: user.role,
    email: user.email,
  });

  return {
    accessToken,
    refreshToken,
    user: { username: user.username, email: user.email, role: user.role },
  };
};
