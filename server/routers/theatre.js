const express = require("express");
const upload = require("../middleware/multerConfig");
const {
  getAllTheatre,
  getSingleTheatre,
  createTheatre,
  updateTheatre,
  deleteTheatre,
} = require("../controllers/theatre");

const router = express.Router();

// Router'lar
router.get("/", getAllTheatre);
router.get("/:id", getSingleTheatre);
router.post("/", upload.array("image", 4), createTheatre);
router.put("/:id", upload.array("image", 4), updateTheatre);
router.delete("/:id", deleteTheatre);

module.exports = router;
