"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GeneralTemplates from "./GeneralTemplates";
import AiTemplates from "./AITemplates";


export default function JournalPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
  
   
    const defaultTab = searchParams.get("tab") || "general";
    const [activeTab, setActiveTab] = useState(defaultTab);
  
   
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      router.push(`?tab=${tab}`);
    };

  return (
    <div className="min-h-screen  p-8 w-full">

      {/* Tabs */}
      <div className="flex justify-center mb-6">
      <div className="flex bg-white shadow-md rounded-full p-1 w-[320px]">

        {/* Affirmation */}
        <button
          onClick={() => handleTabChange("general")}
          className={`w-1/2 py-2 rounded-full transition ${
            activeTab === "general"
              ? "bg-[#ecebff] text-black font-medium"
              : "text-gray-500"
          }`}
        >
       General Templates
        </button>

        {/* Inspiration */}
        <button
          onClick={() => handleTabChange("ai")}
          className={`w-1/2 py-2 rounded-full transition ${
            activeTab === "ai"
              ? "bg-[#ecebff] text-black font-medium"
              : "text-gray-500"
          }`}
        >
         AI Templates
        </button>

      </div>
    </div>

      {/* Content */}
      {activeTab === "general" ? (
      <GeneralTemplates/>
      ) : (
       <AiTemplates/>
      )}
    </div>
  );
}
