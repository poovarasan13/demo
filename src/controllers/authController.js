const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: err.message,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        expires: "1 day",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: err.message,
    });
  }
};
