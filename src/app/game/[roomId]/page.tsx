"use client";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import * as Ably from "ably";
import Image from "next/image";
import { Button } from "@buzzer/components/Button";

const client = new Ably.Realtime(`${process.env.ABLY_API_KEY}`);

export default function Page({ params }: { params: { roomId: string } }) {
  const { roomId } = params;

  const [started, setStarted] = useState(false);
  const [clicks, setClicks] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);

  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(`https://buzzer-game-delta.vercel.app/game/play/${roomId}`, { errorCorrectionLevel: "H" })
      .then((url: string) => {
        setQrCodeUrl(url);
      })
      .catch((err: unknown) => {
        console.error("Error generating QR Code", err);
      });

    client.channels.get(`room-${roomId}`).subscribe("join", (message) => {
      const players = [...clicks];
      const newPlayer = message.data;
      !players.includes(newPlayer) && players.push(newPlayer);
      setPlayers(players);
    });
    client.channels.get(`room-${roomId}`).subscribe("click", (message) => {
      const newClicks = [...clicks];
      const newClick = message.data;
      !newClicks.includes(newClick) && newClicks.push(newClick);

      setClicks(newClicks);
    });
  }, [roomId]);

  const startGame = () => {
    setStarted(true);
    setClicks([]);
    client.channels.get(`room-${roomId}`).publish("status", "start");
    client.channels.get(`room-${roomId}`).publish("clicks", []);
  };

  useEffect(() => {
    client.channels.get(`room-${roomId}`).publish("clicks", clicks);
  }, [clicks]);
  const readyToPlay = (players.length !== 0 && !started) || clicks.length === 0;

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-6 fixed inset-0">
      {!started && <h1 className="text-white font-bold uppercase text-3xl">{roomId}</h1>}
      <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 absolute top-6 right-6">
        {players.map((player, index) => (
          <div key={`${player.userId}-${index}`} className="flex items-center gap-4">
            <Image src={player.image} width={40} height={40} alt={player.name} className="w-10 h-10 rounded-full" />
            <p className="text-white">{player.name}</p>
          </div>
        ))}
      </ul>
      <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside text-4xl text-white font-bold">
        {clicks.map((click) => (
          <li key={nanoid()}>{click.name}</li>
        ))}
      </ol>
      {!started && <>{qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" width={300} /> : <p>Generating QR code...</p>}</>}
      <Button onClick={startGame} className={`w-full h-20 fixed left-0 right-0 bottom-0 text-4xl ${readyToPlay && "opacity-50 pointer-events-none"}`}>
        Start Game
      </Button>
    </div>
  );
}
