"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const JoinForm = () => {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setRoomId(value);
    }
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    // Ensure that the input has exactly 5 digits before searching
    if (roomId.length === 5) {
      toast.success("Тоглоом орж ирлээ!");
      router.push("/game/play/" + roomId);
    } else {
      toast.error("5 Оронтой тоог зөв оруулна уу!");
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <input
          type="text"
          id="default-search"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Өрөөний 5 оронтой код"
          required
          value={roomId}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Орох
        </button>
      </div>
    </form>
  );
};
