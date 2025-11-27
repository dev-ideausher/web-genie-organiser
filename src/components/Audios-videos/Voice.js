"use client";

import { MoreVertical, Play } from "lucide-react";

export default function Voice() {
  const memos = [
    { title: "Voice Memo #1", duration: "5m 30s" },
    { title: "Voice Memo #1", duration: "5m 30s" },
    { title: "Voice Memo #1", duration: "5m 30s" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-10 font-sans">
  
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold">Voice Memos</h1>
          <p className="text-gray-500 mt-1">
            Record and manage your voice recordings.
          </p>
        </div>

        <button className="bg-[#6C63FF] text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-[#5a54e6] transition">
          <span className="text-xl">+</span> Add Voice Memo
        </button>
      </div>


      <div className="mt-10 w-full max-w-xl space-y-4">
        {memos.map((memo, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
    
              <div className="w-12 h-12 border border-[#6C63FF] rounded-full flex items-center justify-center">
                <Play className="text-[#6C63FF]" size={20} />
              </div>

            
              <div>
                <p className="font-semibold">{memo.title}</p>
                <p className="text-gray-400 text-sm">{memo.duration}</p>
              </div>
            </div>

    
            <MoreVertical className="text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
