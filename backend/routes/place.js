const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

router.post("/register-place", async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();

    res.json({
      success: true,
      msg: "Tempat berhasil didaftarkan",
      place,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Gagal menyimpan tempat",
    });
  }
});

router.get("/places", async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

module.exports = router;
