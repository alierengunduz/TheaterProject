const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    eventtype: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Array,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },

  { timestamps: true }
);

const Activity = mongoose.model("activity", activitySchema);
module.exports = Activity;
