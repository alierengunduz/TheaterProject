const ChildrenTheatre = require("../models/childrenTheatre");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const fs = require("fs");
const path = require("path");

//get all
const getAllChildrenTheatre = async (req, res) => {
  try {
    const childrenTheatre = await ChildrenTheatre.find();
    res.status(200).json(childrenTheatre);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single theatre
const getSingleChildrenTheatre = async (req, res) => {
  try {
    const childTheatreId = req.params.id;
    if (!objectId.isValid(childTheatreId)) {
      return res.status(400).json({ message: "Invalid children ID" });
    }
    const children = await ChildrenTheatre.findById(childTheatreId);
    if (!children) {
      return res.status(404).json({ message: "children not found" });
    }
    res.status(200).json(children);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

//creage
const createChildrenTheatre = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path);
    if (!imagePaths) {
      return res.status(400).json({
        message: "Image is required",
      });
    }
    const { name, description, eventtype, age, time } = req.body;
    if (!name || !description || !eventtype || !age || !time) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const childTheatre = new ChildrenTheatre({
      name,
      description,
      eventtype,
      age,
      time,
      image: imagePaths,
    });
    await childTheatre.save();
    res.status(201).json(childTheatre);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//update
const updateChildrenTheatre = async (req, res) => {
  try {
    const childTheatreId = req.params.id;
    if (!objectId.isValid(childTheatreId)) {
      return res.status(400).json({
        message: "Invalid ChildTheatre ID",
      });
    }
    const childTheatre = ChildrenTheatre.findById(childTheatreId);
    if (!childTheatre) {
      return res.status(400).json({
        message: "childTheatre not found",
      });
    }
    const imagePath = req.file ? req.file.path : childTheatre.image;
    const { name, description } = req.body;
    childTheatre.name = name;
    childTheatre.description = description;
    childTheatre.image = imagePath;
    await childTheatre.save();
    res.status(200).json(childTheatre);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// delete
const deleteChildrenTheatre = async (req, res) => {
  try {
    const childTheatreId = req.params.id;
    if (!objectId.isValid(childTheatreId)) {
      return res.status(400).json({
        message: "Invalid ChildTheatre ID",
      });
    }
    const childTheatre = await ChildrenTheatre.findById(childTheatreId);
    if (!childTheatre) {
      return res.status(404).json({ message: "ChildTheatre not found" });
    }
    // Dosya yollarını ayarla
    const imagePaths = childTheatre.image.map((imgPath) =>
      path.join(__dirname, "../uploads", path.basename(imgPath))
    );

    // Tiyatro kaydını sil
    await ChildrenTheatre.findByIdAndDelete(childTheatreId);

    // Her bir resim dosyasını sil
    imagePaths.forEach((imagePath) => {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting image at ${imagePath}: ${err.message}`);
        } else {
          console.log(`Successfully deleted image: ${imagePath}`);
        }
      });
    });

    return res.status(200).json({
      message: "Theatre and associated images deleted successfully",
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//search
const searchChildTheatre = async (req, res) => {
  try {
    const childTheatreName = req.params.name;
    const childTheatre = await ChildrenTheatre.find({
      name: { $regex: childTheatreName, $options: "i" },
    });
    res.status(200).json(childTheatre);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllChildrenTheatre,
  createChildrenTheatre,
  updateChildrenTheatre,
  deleteChildrenTheatre,
  searchChildTheatre,
  getSingleChildrenTheatre,
};
