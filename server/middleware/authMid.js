const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const userControl = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // artık jwt'yi çözdük biz içinde userId verisini saklamıştık
    // bu bir middlware olduğu için req.user'a atıyoruz ki diğer route'larda kullanabilelim
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

module.exports = { userControl };
