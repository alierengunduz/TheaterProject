const ActivityFilter = require("../models/activityFilter");

//get all theatre filters
const getTheatreFilters = async (req, res) => {
  try {
    const theatreFilters = await ActivityFilter.find({});
    res.json(theatreFilters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get theatre filter by id
const getTheatreFilterById = async (req, res) => {
  try {
    const theatreFilter = await ActivityFilter.findById(req.params.id);
    res.json(theatreFilter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create theatre filter
const createTheatreFilter = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const theatreFilter = new ActivityFilter({
      name,
    });
    const createdTheatreFilter = await theatreFilter.save();
    res.status(201).json(createdTheatreFilter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update theatre filter
const updateTheatreFilter = async (req, res) => {
  try {
    const theatreFilter = await ActivityFilter.findById(req.params.id);
    if (theatreFilter) {
      theatreFilter.name = req.body.name || theatreFilter.name;

      const updatedTheatreFilter = await theatreFilter.save();
      res.json(updatedTheatreFilter);
    } else {
      res.status(404).json({ message: "Theatre Filter not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete theatre filter
const deleteTheatreFilter = async (req, res) => {
  try {
    const { id } = req.params;
    const theatreFilter = await ActivityFilter.findOneAndDelete({ _id: id });
    res.status(200).json(theatreFilter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTheatreFilters,
  getTheatreFilterById,
  createTheatreFilter,
  updateTheatreFilter,
  deleteTheatreFilter,
};
