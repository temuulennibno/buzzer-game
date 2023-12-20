"use client";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { roomId: string } }) {
  const { roomId } = params;

  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(`http://localhost:3300/game/play/{roomId}`, { errorCorrectionLevel: "H" })
      .then((url: string) => {
        setQrCodeUrl(url);
      })
      .catch((err: unknown) => {
        console.error("Error generating QR Code", err);
      });
  }, [roomId]);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-6">
      <h1 className="text-white font-bold uppercase text-3xl">{roomId}</h1>
      {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" width={300} /> : <p>Generating QR code...</p>}
    </div>
  );
}
