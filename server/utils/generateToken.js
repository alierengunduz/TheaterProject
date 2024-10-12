const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = (res, userId) => {
  //Token oluştur
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //Token'i saklıyoruz
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
    samesite: "strict",
  });
};

module.exports = generateToken;
