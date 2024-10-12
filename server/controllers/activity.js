const Activity = require("../models/activity");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const fs = require("fs");
const path = require("path");

const getAllActivity = async (req, res) => {
  try {
    const { category } = req.query;
    // Eğer category all ise tüm ürünleri getir
    const query = category && category !== "all" ? { category } : {};
    const activity = await Activity.find(query);
    res.status(200).json(activity);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get single theatre
const getSingleActivity = async (req, res) => {
  try {
    const activityId = req.params.id;
    if (!objectId.isValid(activityId)) {
      return res.status(400).json({ message: "Invalid Activity ID" });
    }
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

const createActivity = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path);
    const { name, description, category, eventtype, age, time } = req.body;
    const newActivity = new Activity({
      name,
      description,
      category,
      eventtype,
      age,
      time,
      image: imagePaths,
    });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//delete theatre
const deleteActivity = async (req, res) => {
  try {
    const activityId = req.params.id;
    if (!objectId.isValid(activityId)) {
      return res.status(400).json({
        message: "Invalid activity ID",
      });
    }
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Dosya yollarını ayarla
    const imagePaths = activity.image.map((imgPath) =>
      path.join(__dirname, "../uploads", path.basename(imgPath))
    );

    // Tiyatro kaydını sil
    await Activity.findByIdAndDelete(activityId);

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
  getAllActivity,
  createActivity,
  deleteActivity,
  getSingleActivity,
};
