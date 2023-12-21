"use client";
import { Button } from "@buzzer/components/Button";
import { getAvatar } from "@buzzer/utils/getAvatar";
import { nanoid } from "nanoid";
import Image from "next/image";
import * as Ably from "ably";
import { useEffect, useState } from "react";

const client = new Ably.Realtime(`${process.env.ABLY_API_KEY}`);

export default function Page({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("/food-icons/Pretzel.webp");
  const [started, setStarted] = useState(false);
  const [clicks, setClicks] = useState<any[]>([]);
  const getPosition = () => {
    for (let i = 0; i < clicks.length; i++) {
      if (clicks[i].userId === userId) {
        return i + 1;
      }
    }
    return -1;
  };

  const buzz = () => {
    client.channels.get(`room-${roomId}`).publish("click", { userId, name, image });
  };

  useEffect(() => {
    if (name) {
      client.channels.get(`room-${roomId}`).subscribe(`status`, (message: any) => {
        setStarted(message.data === "start");
      });
      const newImage = getAvatar();
      setImage(newImage);
      const userId = nanoid();
      setUserId(userId);
      client.channels.get(`room-${roomId}`).publish("join", { userId, name, image: newImage });
      client.channels.get(`room-${roomId}`).subscribe("clicks", (message) => {
        console.log("message.data:", message.data);
        setClicks(message.data);
      });
    } else {
      const name = prompt("Insert your name?", "Player");
      setName(`${name}`);
    }
  }, [name]);

  const waiting = !started || clicks.length > 0;

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-6 bg-[#424242] absolute inset-0">
      <Image src={image} alt={""} width={300} height={300} style={{ transform: "translateX(-50%)" }} className="fixed top-0 left-1/2" />
      {clicks.length > 0 && <h1 className="text-white font-bold text-5xl">You clicked #{getPosition()}</h1>}
      <Button className={`w-full h-20 fixed left-0 right-0 bottom-0 text-4xl ${waiting && "opacity-50 pointer-events-none"}`} color="red" disabled={waiting} onClick={buzz}>
        {waiting ? "Waiting for host..." : "BUZZ"}
      </Button>
    </div>
  );
}
