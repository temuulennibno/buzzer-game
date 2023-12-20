"use client";
import { getRoomNumber } from "@buzzer/utils/getRoomNumber";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const roomNumber = getRoomNumber();
  const router = useRouter();
  useEffect(() => {
    router.replace(`/game/${roomNumber}`);
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-6">
      <h1 className="text-white font-bold uppercase text-3xl">Уншиж байна...</h1>
    </div>
  );
}
