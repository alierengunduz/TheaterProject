const router = require("express").Router();
const { userControl } = require("../middleware/authMid");
const {
  authUser,
  registerUser,
  logout,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/user");

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logout);
router.delete("/:id", userControl, deleteUser);
router.get("/allUser", userControl, getAllUsers);
router.get("/profile", userControl, getUserProfile);
router.put("/profile", userControl, updateUserProfile);

module.exports = router;
