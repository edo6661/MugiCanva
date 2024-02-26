"use client";
import { randomImages } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TempLoading() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const generateRandomImages =
    randomImages[Math.floor(Math.random() * randomImages.length)];
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      {isMounted && (
        <Image
          src={generateRandomImages}
          alt="Logo"
          width={386}
          height={320}
          priority
          className="animate-pulse duration-700 object-contain w-auto h-auto"
        />
      )}
    </div>
  );
}
