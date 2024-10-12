const Theatre = require("../models/theatre");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const fs = require("fs");
const path = require("path");

// Get all theatre
const getAllTheatre = async (req, res) => {
  try {
    const { type } = req.query;

    // Eğer kategori 'All' ise tüm ürünleri getir
    const query = type && type !== "all" ? { type: type.toLowerCase() } : {};

    const theatre = await Theatre.find(query);
    res.status(200).json(theatre);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single theatre
const getSingleTheatre = async (req, res) => {
  try {
    const theatreId = req.params.id;
    if (!objectId.isValid(theatreId)) {
      return res.status(400).json({ message: "Invalid Theatre ID" });
    }
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }
    res.status(200).json(theatre);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new theatre
const createTheatre = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path);
    if (!imagePaths) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { name, description, type, age, eventtype, time } = req.body;
    if (!name || !description || !type || !age || !eventtype || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Yeni tiyatro oluşturma
    const theatre = new Theatre({
      name,
      description,
      age,
      eventtype,
      time,
      type: type.toLowerCase(),
      image: imagePaths,
    });

    await theatre.save();
    res.status(201).json(theatre);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// update theatre
const updateTheatre = async (req, res) => {
  try {
    const theatreId = req.params.id;

    if (!objectId.isValid(theatreId)) {
      return res.status(400).json({ message: "Invalid Theatre ID" });
    }

    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Eğer yeni bir dosya yüklenmişse, yeni dosya yolunu kullanın, yoksa eski dosyayı koruyun
    const imagePath = req.file ? req.file.path : theatre.image;
    const { name, description, type } = req.body;

    theatre.name = name;
    theatre.description = description;
    theatre.type = type;
    theatre.image = imagePath;

    await theatre.save();
    res.status(200).json(theatre);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

//delete theatre
const deleteTheatre = async (req, res) => {
  try {
    const theatreId = req.params.id;
    if (!objectId.isValid(theatreId)) {
      return res.status(400).json({
        message: "Invalid ChildTheatre ID",
      });
    }
    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Dosya yollarını ayarla
    const imagePaths = theatre.image.map((imgPath) =>
      path.join(__dirname, "../uploads", path.basename(imgPath))
    );

    // Tiyatro kaydını sil
    await Theatre.findByIdAndDelete(theatreId);

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
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllTheatre,
  getSingleTheatre,
  createTheatre,
  updateTheatre,
  deleteTheatre,
};
