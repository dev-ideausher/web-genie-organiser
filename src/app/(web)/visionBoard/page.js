"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VisionBoard() {
  const router = useRouter();

  const myPics = [
    "/images/vb1.png",
    "/images/vb2.png",   "/images/vb1.png",   "/images/vb2.png",
  ];

  return (
    <div className="p-6">
      {/* Top Buttons */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => router.push("/visionBoard/create")}
          className="px-5 py-2 bg-[#6C63FF] text-white rounded-xl shadow-md"
        >
          + Create Board
        </button>

        <button className="px-5 py-2 border border-[#6C63FF] rounded-xl text-[#6C63FF] shadow-md">
          Progress Tracker
        </button>
      </div>

      {/* Main Vision Board Banner */}
      <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden mb-6">
        <Image
          src="/images/visionBoard.png"
          alt="Vision Board"
          width={1200}
          height={1600}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="font-semibold text-lg mb-3">My Pics</h2>

      {/* My Pics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {myPics.map((pic, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden h-72 shadow-md"
          >
            <Image
              src={pic}
              alt="User Pic"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
