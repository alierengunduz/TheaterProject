const Actor = require("../models/actor");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const fs = require("fs");
const path = require("path");

// get all
const getAllActor = async (req, res) => {
  try {
    const actorTheatre = await Actor.find();
    res.status(200).json(actorTheatre);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//get by Id
const getIdActor = async (req, res) => {
  try {
    const actorId = req.params.id;
    if (!objectId.isValid(actorId)) {
      return res.status(400).json({
        message: "Invalid Actor ID",
      });
    }
    const actor = await Actor.findById(actorId);
    if (!actor) {
      return res.status(400).json({
        message: "Not found actor",
      });
    }
    res.status(200).json(actor);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// create actor
const createActor = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path);
    if (!imagePaths) {
      return res.status(400).json({
        message: "Image is required",
      });
    }
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const newActor = new Actor({
      name,
      description,
      image: imagePaths,
    });
    await newActor.save();
    res.status(201).json(newActor);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//delete
const deleteActor = async (req, res) => {
  try {
    const actorId = req.params.id;
    if (!objectId.isValid(actorId)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }
    const actor = await Actor.findById(actorId);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    // Dosya yollarını ayarla
    const imagePaths = actor.image.map((imgPath) =>
      path.join(__dirname, "../uploads", path.basename(imgPath))
    );

    // Tiyatro kaydını sil
    await Actor.findByIdAndDelete(actorId);

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
const searchActor = async (req, res) => {
  try {
    const actorName = req.params.name;
    const actor = await Actor.find({
      name: { $regex: actorName, $options: "i" },
    });
    res.status(200).json(actor);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllActor,
  getIdActor,
  createActor,
  deleteActor,
  searchActor,
};
