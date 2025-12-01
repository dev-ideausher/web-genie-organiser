
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash } from "lucide-react";

export default function CreateVisionBoard() {
  const router = useRouter();
  const [goals, setGoals] = useState(["Label 1", "Label 1", "Label 1"]);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([...goals, newGoal]);
    setNewGoal("");
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => router.push("/visionBoard")}
        className="flex items-center gap-2 text-gray-700 mb-6"
      >
        ← Vision Board
      </button>

      {/* Upload Box */}
      <div className="border border-dashed rounded-2xl h-56 flex flex-col items-center justify-center text-gray-500 mb-6 w-4/5">
        <span className="text-4xl"></span>
        <p>Upload Pics</p>
      </div>

      {/* Goals Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-4/5">
        <h2 className="font-semibold text-lg">Your goals</h2>
        <p className="text-sm text-gray-500 mb-4">
          Once created, you can go to progress tracker to mark your goals complete
        </p>

        <div className="space-y-3">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>{goal}</span>
              </div>

              <button className="text-gray-400 text-xl">
                <Trash/>
              </button>
            </div>
          ))}

          {/* Add new goal */}
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2 flex-1">
              <input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Type your goal"
                className="outline-none flex-1"
              />
            </div>

            <button
              onClick={addGoal}
              className="text-gray-400 text-xl"
            >
           <Plus/>
            </button>
          </div>
        </div>

        {/* Create Board Button */}
        <div className="text-right mt-6">
          <button className="px-6 py-2 bg-[#6C63FF] text-white rounded-xl shadow-md">
            Create Vision Board
          </button>
        </div>
      </div>
    </div>
  );
}
