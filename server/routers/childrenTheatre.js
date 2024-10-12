const express = require("express");
const router = express.Router();
const {
  getAllChildrenTheatre,
  createChildrenTheatre,
  updateChildrenTheatre,
  deleteChildrenTheatre,
  searchChildTheatre,
  getSingleChildrenTheatre,
} = require("../controllers/childrenTheatre");
const upload = require("../middleware/multerConfig");

// Router'lar
router.get("/", getAllChildrenTheatre);
router.get("/:id", getSingleChildrenTheatre);
router.post("/", upload.array("image", 4), createChildrenTheatre);
router.put("/:id", upload.array("image", 4), updateChildrenTheatre);
router.delete("/:id", deleteChildrenTheatre);
router.get("/search/:name", searchChildTheatre);

module.exports = router;
