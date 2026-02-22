const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    default: "Player Baru",
  },
  balance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
