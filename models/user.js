const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  age: {
    type: Number,
    required: true,
    range: {
      min: { type: Number, min: 18 },
      max: { type: Number, min: 65 },
    },
  },
  enrolled: {
    type: Boolean,
    default: false,
  },

  batch: {
    type: String,
    enum: ["6-7AM", "7-8AM", "8-9AM", "5-6PM"],
    required: true,
    default: "6-7AM",
  },
});

module.exports = mongoose.model("User", UserSchema);
