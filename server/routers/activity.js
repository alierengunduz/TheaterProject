const express = require("express");
const upload = require("../middleware/multerConfig");
const router = express.Router();
const {
  getAllActivity,
  createActivity,
  deleteActivity,
  getSingleActivity,
} = require("../controllers/activity");

// Router'lar
router.get("/", getAllActivity);
router.get("/:id", getSingleActivity);
router.post("/", upload.array("image", 4), createActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
