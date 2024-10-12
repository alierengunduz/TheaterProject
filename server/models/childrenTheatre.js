const mongoose = require("mongoose");

const childrenTheatreSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const ChildrenTheatre = mongoose.model(
  "ChildrenTheatre",
  childrenTheatreSchema
);
module.exports = ChildrenTheatre;
