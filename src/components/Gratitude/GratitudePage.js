"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";



import InspirationSection from "./InspirationSection";
import AffirmationSection from "./AffirmationSection";
import Globe from "../../../public/icons/Globe";

export default function GratitudePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

 
  const defaultTab = searchParams.get("tab") || "inspiration";
  const [activeTab, setActiveTab] = useState(defaultTab);

 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-6 font-sans">

    {/* Tabs */}
    <div className="flex justify-center mb-6">
      <div className="flex bg-white shadow-md rounded-full p-1 w-[320px]">

        {/* Affirmation */}
        <button
          onClick={() => handleTabChange("affirmation")}
          className={`w-1/2 py-2 rounded-full transition ${
            activeTab === "affirmation"
              ? "bg-[#ecebff] text-black font-medium"
              : "text-gray-500"
          }`}
        >
          Affirmation
        </button>

        {/* Inspiration */}
        <button
          onClick={() => handleTabChange("inspiration")}
          className={`w-1/2 py-2 rounded-full transition ${
            activeTab === "inspiration"
              ? "bg-[#ecebff] text-black font-medium"
              : "text-gray-500"
          }`}
        >
          Inspiration
        </button>

      </div>
    </div>

    {/* Add Background */}
    <div className="flex justify-end pr-4">
      <button className="flex items-center gap-2 border border-[#6c63ff] text-[#6c63ff] px-4 py-2 rounded-full hover:bg-[#f2f0ff] transition">
        <span className="material-icons"><Globe/></span> Add Background
      </button>
    </div>


    {activeTab === "inspiration" ? (
      <InspirationSection />
    ) : (
      <AffirmationSection />
    )}
  </div>
  )
}

