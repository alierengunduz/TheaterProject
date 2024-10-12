const router = require("express").Router();
const {
  getTheatreFilters,
  getTheatreFilterById,
  createTheatreFilter,
  updateTheatreFilter,
  deleteTheatreFilter,
} = require("../controllers/theatreFilter");

router.get("/", getTheatreFilters);
router.get("/:id", getTheatreFilterById);
router.post("/", createTheatreFilter);
router.put("/:id", updateTheatreFilter);
router.delete("/:id", deleteTheatreFilter);

module.exports = router;
