const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  qrCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  rent: {
    land: Number,
    house1: Number,
    house2: Number,
    house3: Number,
    house4: Number,
    hotel: Number,
  },
  priceHouse: Number,
  priceHotel: Number,
  mortgagePrice: Number,
});

module.exports = mongoose.model("Place", PlaceSchema);
