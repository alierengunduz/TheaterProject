const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
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
    image: {
      type: Array,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Actor = mongoose.model("Actor", actorSchema);
module.exports = Actor;
