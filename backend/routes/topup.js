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

  console.log("Menerima request dari:", cardId); // Cek di terminal backend

  if (!cardId) {
    return res
      .status(400)
      .json({ success: false, msg: "Kartu tidak terdeteksi" });
  }

  try {
    let user = await User.findOne({ cardId: cardId });

    if (user) {
      user.balance += FIXED_NOMINAL;
      await user.save();

      return res.json({
        success: true,
        msg: "Saldo berhasil ditambahkan",
        user: {
          cardId: user.cardId,
          username: user.username,
          addedNominal: FIXED_NOMINAL,
          newBalance: user.balance,
        },
      });
    } else {
      user = new User({
        cardId: cardId,
        username: `Player-${cardId}`,
        balance: FIXED_NOMINAL,
      });
      await user.save();

      return res.json({
        success: true,
        msg: "Kartu baru berhasil didaftarkan & diisi saldo!",
        user: {
          cardId: user.cardId,
          username: user.username,
          addedNominal: FIXED_NOMINAL,
          newBalance: user.balance,
        },
      });
    }
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

module.exports = router;
