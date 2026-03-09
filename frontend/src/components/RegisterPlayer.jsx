import React, { useState } from "react";
import axios from "axios";
import CameraScanner from "./CameraScanner";

const RegisterPlayer = () => {
  const [username, setUsername] = useState("");
  const [scanned, setScanned] = useState(false);
  const [cardId, setCardId] = useState("");

  const handleScan = async (id) => {
    if (scanned) return; // cegah scan berkali-kali

    setScanned(true);
    setCardId(id);

    try {
      await axios.post("http://localhost:5000/api/topup/register-player", {
        cardId: id,
        username,
      });

      alert("Player berhasil didaftarkan!");
    } catch (err) {
      console.error("Register error:", err);
      alert(err.response?.data?.msg || "Gagal mendaftar");
    }

    // aktifkan scanner lagi jika mau scan ulang
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Register Player</h2>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Nama Player"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <CameraScanner onScanSuccess={handleScan} />

      {cardId && <p className="mt-4 text-green-600">QR terbaca: {cardId}</p>}
    </div>
  );
};

export default RegisterPlayer;
