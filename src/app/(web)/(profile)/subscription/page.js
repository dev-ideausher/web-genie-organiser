// SubscriptionPage.js
"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Header } from "../../../../components/Header";

export default function SubscriptionPage() {
  const [plan, setPlan] = useState("yearly");

  const features = [
    "3+ Tasks & Calendars",
    "3+ Journals",
    "Daily AI prompts",
    "View Compatibility, Love, Health, or Money",
    "Add 3+ Audios & Videos Links",
    "30 Questions per month",
    "3+ Habits",
    "3+ Contacts and Events",
  ];

  return (
    <div className=" w-full min-h-screen  text-black">
      <Header title="Subscription" />
    <div className="p-6 w-full min-h-screen text-black">
      <h1 className="text-3xl font-semibold">Current Subscription</h1>
      <p className="text-gray-600 mb-6">Manage your subscription plan</p>

      <div className="flex items-center justify-between mr-6">
        <h2 className="text-lg font-medium mb-4">Choose Your Plan</h2>
        <div className="flex items-center gap-6 mr-6">
          <button className="px-6 py-2 bg-[#5b5bf3] hover:bg-[#4a4ae0] text-white rounded-xl">Update Plan</button>
          <button className="text-[#5b5bf3]">Cancel Subscription</button>
        </div>
      </div>

      <div className="flex gap-6 mb-10">
        {/* Monthly Plan */}
        <PlanCard
          selected={plan === "monthly"}
          onClick={() => setPlan("monthly")}
          title="Monthly Plan"
          subtitle="Start Small, Stay Focused"
          oldPrice="$8.99/mo"
          newPrice="$4.99/mo"
        />

        {/* Yearly Plan */}
        <PlanCard
          selected={plan === "yearly"}
          onClick={() => setPlan("yearly")}
          title="Yearly Plan"
          subtitle="Commit to Clarity"
          oldPrice="$88.00/y"
          newPrice="$44.00/y"
          highlight
        />
      </div>

      {/* Features */}
      <div className="bg-white rounded-3xl shadow-md p-6 max-w-3xl">
        <h3 className="text-lg font-medium mb-4">Features</h3>
        <div className="grid grid-cols-2 gap-y-4">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between pr-6">
              <p>{item}</p>
              <Check className="text-[#5b5bf3] w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

function PlanCard({ selected, onClick, title, subtitle, oldPrice, newPrice, highlight }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-3xl w-60 border shadow-sm transition-all duration-300 ${
        highlight
          ? "bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white shadow-lg"
          : "bg-white text-black border-gray-200"
      } ${selected ? "ring-2 ring-[#6366f1]" : ""}`}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className={`text-sm mt-1 ${highlight ? "text-gray-200" : "text-gray-500"}`}>{subtitle}</p>

      <p className={`mt-6 line-through text-sm ${highlight ? "text-gray-300" : "text-gray-400"}`}>{oldPrice}</p>
      <p className="text-2xl font-bold">{newPrice}</p>

      {selected && (
        <div className="mt-3 flex justify-end">
          <Check className="w-6 h-6 bg-white text-[#6366f1] rounded-full p-1" />
        </div>
      )}
    </div>
  );
}