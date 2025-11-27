"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AudioSection from "./AudioSection";
import Voice from "./Voice";
import VideoSection from "./VideoSection";



export default function AVPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
  
   
    const defaultTab = searchParams.get("tab") || "audio";
    const [activeTab, setActiveTab] = useState(defaultTab);
  
   
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      router.push(`?tab=${tab}`);
    };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8 font-sans w-full">

      {/* Tabs */}
      <div className="flex justify-center mb-6">
      <div className="flex bg-white shadow-md rounded-full p-1 w-[320px]">

        {/* Affirmation */}
        <button
          onClick={() => handleTabChange("audio")}
          className={`w-1/2 py-2 rounded-full transition ${
            activeTab === "audio"
              ? "bg-[#ecebff] text-black font-medium"
              : "text-gray-500"
          }`}
        >
     Audio
        </button>

        {/* Inspiration */}
        <button
          onClick={() => handleTabChange("voice")}
          className={`w-1/2 py-2 rounded-full transition ${
            activeTab === "voice"
              ? "bg-[#ecebff] text-black font-medium"
              : "text-gray-500"
          }`}
        >
     Voice
        </button>
        <button
          onClick={() => handleTabChange("video")}
          className={`w-1/2 py-2 rounded-full transition ${
            activeTab === "video"
              ? "bg-[#ecebff] text-black font-medium"
              : "text-gray-500"
          }`}
        >
Video
        </button>
      </div>
    </div>

      {/* Content */}
      {activeTab === "audio" && 
      <AudioSection/>}
        {activeTab === "video" && 
      <VideoSection/>}
         {activeTab === "voice" && 
      <Voice/>}
    </div>
  );
}
