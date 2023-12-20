"use client";
import { Button } from "@buzzer/components/Button";
import { getAvatar } from "@buzzer/utils/getAvatar";
import { nanoid } from "nanoid";
import Image from "next/image";
import * as Ably from "ably";
import { useEffect, useState } from "react";
import { start } from "repl";

export default function Page({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const userId = nanoid();
  const image = getAvatar();
  const [started, setStarted] = useState(false);
  const [clicks, setClicks] = useState<any[]>([]);
  const getPosition = () => {
    for (let index = 0; index < clicks.length; index++) {
      const click = clicks[index];
      if (click.userId === userId) {
        return index + 1;
      }
    }
  };

  const client = new Ably.Realtime(`${process.env.ABLY_API_KEY}`);

  useEffect(() => {
    client.channels.get(`room-${roomId}-start`).subscribe(`start`, (message: any) => {
      setStarted(message === "start");
    });
  }, []);

  const buttonDisabled = !started;

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-6 bg-[#424242] absolute inset-0">
      <Image src={image} alt={""} width={300} height={300} style={{ transform: "translateX(-50%)" }} className="fixed top-0 left-1/2" />
      {clicks.length > 0 && <h1 className="text-white font-bold text-5xl">You clicked #{getPosition()}</h1>}
      <Button className={`w-full h-20 fixed left-0 right-0 bottom-0 text-4xl ${buttonDisabled && "opacity-50 pointer-events-none"}`} color="red" disabled={buttonDisabled}>
        {!started ? "Waiting for host..." : "BUZZ"}
      </Button>
    </div>
  );
}
