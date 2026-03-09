import React, { useState } from "react";
import axios from "axios";

const RegisterPlace = () => {
  const [form, setForm] = useState({
    name: "",
    qrCode: "",
    land: "",
    house1: "",
    house2: "",
    house3: "",
    house4: "",
    hotel: "",
    priceHouse: "",
    priceHotel: "",
    mortgagePrice: "",
  });

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/place/register-place", {
      qrCode: form.qrCode,
      name: form.name,
      rent: {
        land: form.land,
        house1: form.house1,
        house2: form.house2,
        house3: form.house3,
        house4: form.house4,
        hotel: form.hotel,
      },
      priceHouse: form.priceHouse,
      priceHotel: form.priceHotel,
      mortgagePrice: form.mortgagePrice,
    });

    alert("Tempat berhasil didaftarkan");
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Register Tempat</h2>

      <input
        placeholder="Nama Tempat"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="QR Code"
        onChange={(e) => setForm({ ...form, qrCode: e.target.value })}
      />
      <input
        placeholder="Sewa Tanah"
        onChange={(e) => setForm({ ...form, land: e.target.value })}
      />
      <input
        placeholder="1 Rumah"
        onChange={(e) => setForm({ ...form, house1: e.target.value })}
      />
      <input
        placeholder="2 Rumah"
        onChange={(e) => setForm({ ...form, house2: e.target.value })}
      />
      <input
        placeholder="3 Rumah"
        onChange={(e) => setForm({ ...form, house3: e.target.value })}
      />
      <input
        placeholder="4 Rumah"
        onChange={(e) => setForm({ ...form, house4: e.target.value })}
      />
      <input
        placeholder="Hotel"
        onChange={(e) => setForm({ ...form, hotel: e.target.value })}
      />

      <button onClick={handleSubmit}>Simpan</button>
    </div>
  );
};

export default RegisterPlace;
