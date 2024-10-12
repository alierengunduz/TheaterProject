const express = require("express");
const router = express.Router();
const {
  getAllActor,
  getIdActor,
  createActor,
  deleteActor,
  searchActor,
} = require("../controllers/actor");
const upload = require("../middleware/multerConfig");

// Router'lar
router.get("/", getAllActor);
router.get("/:id", getIdActor);
router.post("/", upload.array("image", 4), createActor);
router.delete("/:id", deleteActor);
router.get("/search/:name", searchActor);

module.exports = router;
