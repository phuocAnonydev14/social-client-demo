"use client"

import Image from "next/image";
import {SocialSdk} from "@/components/SocialSdk";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SocialSdk />
    </main>
  );
}
