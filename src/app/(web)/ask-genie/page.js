"use client";

import { useState } from "react";
import {
  Menu,
  Plus,
  Folder,
  Search,
  MessageSquare,
  Mic,
  Send,
  PenSquare,
  RefreshCcw,
} from "lucide-react";

export default function ChatUI() {
  const [openSidebar, setOpenSidebar] = useState(true);

  const projects = [
    "My savings-plan",
    "Books research",
    "Portfolio study",
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">

    
      <div
        className={`transition-all duration-300    -r bg-[#fafafa] h-full ${
          openSidebar ? "w-64" : "w-14"
        }`}
      >
        {/* Sidebar Header Toggle */}
        <div className="flex items-center justify-between px-4 py-4   ">
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="p-2  rounded-md bg-white hover:bg-gray-50"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        {openSidebar && (
          <div className="px-4 py-5">
            <h2 className="text-gray-600 text-sm tracking-wide mb-3">
              Projects
            </h2>

            <button className="flex items-center gap-2 text-[#6A50FF] hover:text-[#5a44e4] mb-4">
              <Plus size={18} /> Add a Project
            </button>

            <div className="space-y-3">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-200 cursor-pointer group"
                >
                  <Folder size={18} className="text-gray-500" />
                  <span className="text-gray-700">{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

     
      <div className="flex-1 flex flex-col relative">

        {/* -------------- TOP HEADER -------------- */}
        <div className="flex items-center justify-between px-6 py-4    bg-white sticky top-0 z-10">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-[#f2f2f7] px-4 py-2 rounded-full w-[280px]">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            <button className="p-3 bg-[#6A50FF]/10 rounded-full text-[#6A50FF] hover:bg-[#6A50FF]/20 transition">
              <PenSquare size={20} />
            </button>

            <button className="p-3 bg-[#6A50FF]/10 rounded-full text-[#6A50FF] hover:bg-[#6A50FF]/20 transition">
              <RefreshCcw size={20} />
            </button>
          </div>
        </div>

        {/* -------------- MAIN CHAT WINDOW -------------- */}
        <div className="flex-1 overflow-y-auto p-12 flex flex-col items-center text-center">

          {/* Floating 3D mesh (placeholder) */}
          <div className="w-40 h-40 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full blur-sm opacity-80 mb-10"></div>

          {/* Greeting Message */}
          <div className="bg-white shadow-sm rounded-2xl px-6 py-4  w-[400px] text-gray-700 text-lg font-medium">
            ✨ Hi, you can ask me anything
          </div>

          {/* Trending Topics Card */}
          <div className="bg-white mt-8 shadow-sm rounded-2xl px-6 py-6     w-[460px]">
            <h3 className="text-gray-600 text-sm mb-4">
              ✨ Search About trending topics
            </h3>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "Eco-friendly startups",
                "Influencers on social media",
                "Virtual reality experiences",
                "Adoptable rescue pets",
                "Plant-based recipes",
                "Diverse superheroes in comics",
              ].map((topic, i) => (
                <span
                  key={i}
                  className="px-4 py-1        -[#6A50FF] text-[#6A50FF] text-sm rounded-full cursor-pointer hover:bg-[#6A50FF]/10"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* -------------- BOTTOM INPUT FIELD -------------- */}
        <div className="   -t bg-white px-6 py-4 flex items-center gap-4">

          {/* Plus button */}
          <button className="p-3 bg-[#6A50FF]/10 rounded-xl text-[#6A50FF] hover:bg-[#6A50FF]/20 transition">
            <Plus size={20} />
          </button>

          {/* Message Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type your message"
              className="w-full px-4 py-3  border border-gray-200   rounded-xl outline-none"
            />
          </div>

          {/* Mic */}
          <button className="p-3 bg-[#f5f3ff] rounded-full text-[#6A50FF] hover:bg-[#e9e6ff] transition">
            <Mic size={20} />
          </button>

          {/* Send */}
          <button className="p-3 bg-[#6A50FF] rounded-full text-white hover:bg-[#5a44e4] transition">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
