import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const CameraScanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      scannerRef.current.id,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear();
      },
      () => {},
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScanSuccess]);

  return (
    <div className="w-full">
      <div id="reader" ref={scannerRef} className="w-full"></div>
    </div>
  );
};

export default CameraScanner;
