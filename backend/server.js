const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const topupRoutes = require("./routes/topup");
const placeRoutes = require("./routes/place");

const app = express();
const PORT = 5000;

// Middleware WAJIB ada
app.use(cors());
app.use(express.json()); // Untuk membaca body JSON

// Koneksi MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/monopoly_db")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/topup", topupRoutes);
app.use("/api/place", placeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
