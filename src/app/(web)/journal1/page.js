"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TABS = [
  { key: "timeline", label: "Timeline" },
  { key: "calendar", label: "Calendar" },
  { key: "favourites", label: "Favourites" },
  { key: "ai", label: "AI Insights" },
];

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="min-h-screen bg-[#F4F6FA] p-4">
      {/* Header */}
      <JournalHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-white rounded-xl shadow-sm flex min-h-[80vh]">
        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "timeline" && <Timeline />}
          {activeTab === "calendar" && <Calendar />}
          {activeTab === "favourites" && <Favourites />}
          {activeTab === "ai" && <AIInsights />}
        </main>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Timeline</h2>
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-4">
          <p className="text-sm font-medium">Good Starting</p>
          <p className="text-xs text-gray-500 mt-1">
            Today I focused on clarity and progress. Felt productive.
          </p>
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Calendar</h2>
      <div className="border rounded-lg p-6 text-gray-500">
        Calendar UI goes here (date picker / journal by date)
      </div>
    </div>
  );
}

function Favourites() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Favourites</h2>
      {[1, 2].map((i) => (
        <div key={i} className="border rounded-lg p-4">
          <p className="text-sm font-medium">Saved Insight</p>
          <p className="text-xs text-gray-500 mt-1">
            A meaningful journal entry marked as favourite.
          </p>
        </div>
      ))}
    </div>
  );
}

function AIInsights() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">AI Insights</h2>
      <div className="border rounded-lg p-4">
        <p className="text-sm font-medium">Insight #1</p>
        <p className="text-xs text-gray-500 mt-1">
          You write more positively on weekdays than weekends.
        </p>
      </div>
      <div className="border rounded-lg p-4">
        <p className="text-sm font-medium">Insight #2</p>
        <p className="text-xs text-gray-500 mt-1">
          Stress-related keywords reduced this week.
        </p>
      </div>
    </div>
  );
}


function JournalHeader({ activeTab, setActiveTab }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 mb-4 flex items-center justify-between">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab.key
                ? "bg-white shadow text-gray-900"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        <button
          onClick={() => router.push('/journal')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          <span className="text-lg">＋</span>
          Add Entry
        </button>
      </div>
    </div>
  );
}
