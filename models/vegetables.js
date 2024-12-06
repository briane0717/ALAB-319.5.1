const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    readyToEat: Boolean,
  },
  {
    timestamps: true,
  }
);

const Vegetable = mongoose.model("Vegetable", vegetableSchema);

module.exports = Vegetable;
