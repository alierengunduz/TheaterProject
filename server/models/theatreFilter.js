const mongoose = require("mongoose");

const theatreFilterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const TheatreFilter = mongoose.model("TheatreFilter", theatreFilterSchema);
module.exports = TheatreFilter;
