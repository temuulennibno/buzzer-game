import { Button } from "@buzzer/components/Button";
import { JoinForm } from "@buzzer/components/JoinForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-6">
      <h1 className="text-white font-bold uppercase text-3xl">Buzzer Game</h1>
      <Link href={"/game/new"}>
        <Button color="purple">Тоглоом үүсгэх</Button>
      </Link>
      <JoinForm />
    </div>
  );
}
