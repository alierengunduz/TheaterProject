const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const mongoose = require("mongoose");

const objectId = mongoose.Types.ObjectId;

//gelAllUsers
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

//Deleteuser
const deleteUser = asyncHandler(async (req, res) => {
  if (objectId.isValid(req.params.id) === false) {
    res.status(400);
    throw new Error("Invalid ID");
  }
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(200).json({
      message: "User deleted",
    });
  }
});

//public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  generateToken(res, user._id);
  res.status(200).json({
    _id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
});

//public
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    email,
    name,
    password,
    role: "user",
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//public - Sonuçta cookie silicez
const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged out",
  });
});

//Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//private
const updateUserProfile = asyncHandler(async (req, res) => {
  // req.user geliyor ama içinde password gelmiyor select ile onu çıkarıyoruz o yüzden tüm body'i alıyoruz
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    generateToken(res, updatedUser._id);
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  registerUser,
  logout,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
