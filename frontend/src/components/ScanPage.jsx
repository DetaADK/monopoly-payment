import React, { useState } from "react";
import axios from "axios";
import CameraScanner from "./CameraScanner";
import UserList from "./UserList";

const ScanPage = () => {
  // Status: 'scanning' | 'confirm' | 'success'
  const [status, setStatus] = useState("scanning");
  const [cardId, setCardId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const NOMINAL_TETAP = 150000;

  // Pindah resetScanner ke sini (atas)
  const resetScanner = () => {
    setCardId("");
    setStatus("scanning");
    setResult(null);
  };

  const handleScanSuccess = (decodedText) => {
    setCardId(decodedText);
    setStatus("confirm");
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/topup/process-scan",
        {
          cardId: cardId,
        },
      );

      if (response.data.success) {
        setResult(response.data.user);
        setStatus("success");
      } else {
        alert("Gagal: " + response.data.msg);
        resetScanner();
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan server");
      resetScanner();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" bg-zinc-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full">
          {/* Header */}
          <div className="bg-lime-700 p-4 text-center">
            <h1 className="text-white text-2xl font-bold">
              Monopoly Isi Saldo
            </h1>
            <p className="text-blue-200 text-sm">Scan Kartu Player</p>
          </div>

          <div className="p-6">
            {/* Tampilan Scanner (Kamera) */}
            {status === "scanning" && (
              <div className="space-y-4">
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-gray-500 mb-4">
                    Arahkan kamera ke barcode kartu
                  </p>
                  <CameraScanner onScanSuccess={handleScanSuccess} />
                </div>
              </div>
            )}

            {/* Tampilan Konfirmasi */}
            {status === "confirm" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <p className="text-yellow-800 font-bold text-lg">
                    Kartu Terdeteksi!
                  </p>
                  <p className="text-3xl font-mono font-bold text-gray-800 mt-2">
                    {cardId}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nominal Top-up:</span>
                    <span className="text-2xl font-bold text-green-600">
                      Rp {NOMINAL_TETAP.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetScanner}
                    className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-600 font-bold hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="flex-1 py-3 rounded-lg bg-lime-700 text-white font-bold text-lg hover:bg-lime-800 disabled:opacity-50"
                  >
                    {loading ? "Memproses..." : "Konfirmasi"}
                  </button>
                </div>
              </div>
            )}

            {/* Tampilan Sukses */}
            {status === "success" && result && (
              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">✅</span>
                </div>

                <div>
                  <p className="text-gray-500">Player</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {result.username}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-600 text-sm">Saldo Ditambahkan</p>
                  <p className="text-3xl font-bold text-green-700">
                    +Rp {result.addedNominal.toLocaleString()}
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-gray-500 text-sm">Saldo Sekarang</p>
                  <p className="text-2xl font-bold text-gray-800">
                    Rp {result.newBalance.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={resetScanner}
                  className="w-full py-3 mt-4 rounded-lg bg-lime-700 text-white font-bold text-lg hover:bg-lime-800"
                >
                  Scan Kartu Lain
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScanPage;
