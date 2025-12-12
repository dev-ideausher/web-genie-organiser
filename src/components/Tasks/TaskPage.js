"use client";

import { useRouter, useSearchParams } from "next/navigation";

import ActivitiesTab from "./ActivityTab";
import TasksTab from "./TaskTab";


export default function TasksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "tasks";

  const handleTabSwitch = (tab) => {
    router.push(`/task?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="p-6">

      {/* Toggle Tabs */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-[16px] flex gap-1">
          <button
            onClick={() => handleTabSwitch("tasks")}
            className={`px-6 py-2 rounded-[12px] transition cursor-pointer ${
              currentTab === "tasks"
                ? "bg-white shadow font-medium"
                : "text-gray-500"
            }`}
          >
            Tasks
          </button>

          <button
            onClick={() => handleTabSwitch("activities")}
            className={`px-6 py-2 rounded-[12px] transition cursor-pointer ${
              currentTab === "activities"
                ? "bg-white shadow font-medium"
                : "text-gray-500"
            }`}
          >
            Activities
          </button>
        </div>
      </div>

      {/* Show Tab UI */}
      {currentTab === "tasks" ? <TasksTab /> : <ActivitiesTab/>}
    </div>
  );
}
