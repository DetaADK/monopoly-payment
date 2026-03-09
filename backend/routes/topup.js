// routes/topup.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

const FIXED_NOMINAL = 150000;

// Ambil semua user
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

router.post("/process-scan", async (req, res) => {
  const { cardId } = req.body;

  if (!cardId) {
    return res
      .status(400)
      .json({ success: false, msg: "Kartu tidak terdeteksi" });
  }

  try {
    const user = await User.findOne({ cardId });

    if (!user) {
      return res.json({
        success: false,
        msg: "Player belum terdaftar",
      });
    }

    // Aktifkan player
    user.isActive = true;
    await user.save();

    res.json({
      success: true,
      msg: "Player berhasil diaktifkan",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

router.post("/deactivate", async (req, res) => {
  const { cardId } = req.body;

  try {
    const user = await User.findOne({ cardId });

    if (!user) {
      return res.json({
        success: false,
        msg: "User tidak ditemukan",
      });
    }

    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      msg: "Player dinonaktifkan",
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

module.exports = router;
