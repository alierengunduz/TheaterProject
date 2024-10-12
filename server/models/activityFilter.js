const mongoose = require("mongoose");

const activityFilterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const ActivityFilter = mongoose.model("ActivityFilter", activityFilterSchema);
module.exports = ActivityFilter;
