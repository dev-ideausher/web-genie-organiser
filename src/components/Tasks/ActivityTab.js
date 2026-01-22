"use client";

import { ArrowRight } from "lucide-react";
import Cal from "../../../public/icons/Cal";
import History from "../../../public/icons/History";
import Plus from "../../../public/icons/Plus";
import { useRouter } from "next/navigation";
import { getActivityStats } from "../../services/APIs/Task";
import { useEffect, useState } from "react";

export default function ActivitiesTab() {
  const router = useRouter();
  const [activities, setActivities] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getActivityStats();
      if (response?.status) {
        setActivities(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch activities", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB");

  return (
    <div>
      {/* Date + History */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <button className="border border-primary px-4 py-2 rounded-lg flex items-center gap-2">
            <Cal /> {formattedDate}
          </button>

          <button className="border border-primary px-4 py-2 rounded-lg flex items-center gap-2">
            <History /> History
          </button>
        </div>

        <button
          onClick={() => router.push("/task/create")}
          className="px-5 py-2 bg-[#6C63FF] text-white rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus /> Create Activity
        </button>
      </div>

      {/* Activities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activities.map((act) => {
          const hasTasks = act.totalCount !== undefined && act.pendingCount !== undefined;
          const totalCount = act.totalCount || 0;
          const pendingCount = act.pendingCount || 0;
          const completed = totalCount - pendingCount;
          const percentage = totalCount > 0 ? (completed / totalCount) * 100 : 0;
          
          // Calculate the stroke-dasharray for the pie chart
          const circumference = 2 * Math.PI * 20; // radius is 20 (40/2)
          const offset = circumference - (percentage / 100) * circumference;

          return (
            <div
              key={act._id}
              onClick={() => router.push(`/activity/${act._id}`)}
              className="bg-white p-4 shadow rounded-xl flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow"
            >
              {hasTasks ? (
                <>
                  {/* Dynamic Pie Chart */}
                  <div className="w-14 h-14 mx-auto relative">
                    <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 44 44">
                      {/* Background circle */}
                      <circle
                        cx="22"
                        cy="22"
                        r="20"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                      />
                      {/* Progress circle */}
                      {percentage > 0 && (
                        <circle
                          cx="22"
                          cy="22"
                          r="20"
                          fill="none"
                          stroke="#6366F1"
                          strokeWidth="4"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                  </div>

                  <p className="font-medium text-center">
                    {completed}/{totalCount} done
                  </p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 mx-auto border-8 border-gray-300 rounded-full"></div>
                  <p className="font-medium text-center text-gray-400">No tasks yet</p>
                </>
              )}

              <div className="flex justify-between items-center">
                <p className="font-semibold">{act.title}</p>
                <ArrowRight />
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
}
