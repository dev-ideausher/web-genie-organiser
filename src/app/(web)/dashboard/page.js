"use client";
import { useRouter } from "next/navigation";
import { getToken } from "../../../services/auth/userCookies";
import React, { useEffect, useState } from "react";
import TodayTask from "../../../../public/icons/TodayTask";
import { getDashboardAPI } from "../../../services/APIs/Dashboard";
import Audio from "../../../../public/icons/Audio";
import Calender from "../../../../public/icons/Calender";
import Gratitude from "../../../../public/icons/Gratitude";
import Horoscope from "../../../../public/icons/Horoscope";
import Videos from "../../../../public/icons/Videos";
import Journal from "../../../../public/icons/Journal";

export default function Dashboard() {
  const today = new Date();
  const [dashboardData, setDashboardData] = useState(null);

  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });

 
  const firstDay = new Date(year, month, 1).getDay(); // Sunday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let calendarDays = [];

  
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }


  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }
const route=useRouter()
const fetchData = async () => {
  try {
    const response = await getDashboardAPI();
    if (response?.status) {
      setDashboardData(response.data);
    }
  } catch (err) {
    console.log(err);
  }
};

useEffect(()=>{
fetchData();
},[])
if (!dashboardData) {
  return    <div className="flex items-center justify-center min-h-screen">
  <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a4bda] mx-auto mb-4"></div>
      <p className="text-xl font-medium text-[#4a4bda] capitalize">
          Loading ...
      </p>
  </div>
</div>
;
}

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5 bg-bg">
      {/* Today's Tasks */}
      <section className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={()=>route.push("/task")}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
   <TodayTask/>
          Today's Tasks</h2>
        <div className="flex flex-col gap-3">
        {dashboardData?.pendingTasks?.length ? (
  dashboardData.pendingTasks.map((task) => (
    <div
      key={task._id}
      className="bg-[#eef0ff] p-4 rounded-lg text-sm shadow-sm"
    >
      <p className="font-semibold">{task.title}</p>
      <p className="text-gray-600 text-xs">
        {task.date} • {task.time}
      </p>
    </div>
  ))
) : (
  <p className="text-sm text-gray-500">No pending tasks.</p>
)}

        </div>
      </section>

      {/* Calendar */}
      <section className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={()=>route.push("/calender")}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
     <Calender/>Calendar</h2>

        <div className="bg-[#f5f6ff] p-4 rounded-xl">
          <p className="font-medium text-lg">
            {monthName} {year}
          </p>

          {/* Week headings */}
          <div className="grid grid-cols-7 text-gray-500 text-sm mt-4 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
              <p key={w}>{w}</p>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2 text-center mt-3">
            {calendarDays.map((day, index) => {
              const isToday = day === today.getDate();

              return (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    day
                      ? isToday
                        ? "bg-[#4a4bda] text-white font-semibold"
                        : "text-gray-700"
                      : ""
                  }`}
                >
                  {day || ""}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audios */}
      <section className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={()=>route.push("/audios-and-videos?tab=voice")}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
       <Audio/> Audios</h2>

       <div className="grid grid-cols-2 gap-4">
  {dashboardData?.audioGroups?.length ? (dashboardData?.audioGroups?.map((item) => (
    <div
      key={item._id}
      className="h-32 rounded-xl flex items-end p-3 text-white font-medium bg-cover bg-center capitalize"
      style={{ backgroundImage: `url(/images/vb1.png)` }}
    >
      {item.title}
    </div>
  ))
) : (
  <p className="text-sm text-gray-500">No audios available.</p>
)
  }
</div>

      </section>

      {/* Gratitude */}
      <section className="flex flex-col gap-6">
     <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={()=>route.push("/gratitude")}>
         <h2 className="text-lg font-semibold mb-4  flex items-center gap-2">
    <Gratitude/>Gratitude</h2>
<blockquote className="text-gray-700 italic text-sm">
  "{dashboardData?.quote?.quote||"NA"}"
  <br />
  <span className="block mt-2 text-right">- {dashboardData?.quote?.author}</span>
</blockquote>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={()=>route.push("/horoscope")}>  
           <h2 className="text-lg font-semibold mb-4  flex items-center gap-2">
     <Horoscope/>Horoscope</h2>
<blockquote className="text-gray-700 italic text-sm">
  "{dashboardData?.horoscope?.horoscope||"NA"}"
  <br />
  <span className="block mt-2 text-right">
    - {dashboardData?.horoscope?.sign?.toUpperCase()}
  </span>
</blockquote>

        </div>
      </section>

      {/* Videos */}
      <section className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={()=>route.push("/audios-and-videos?tab=video")}>
  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
   <Videos/>Videos</h2>

  <div className="flex flex-col gap-4">
  {dashboardData?.videoGroups?.length ?(dashboardData?.videoGroups?.map((item) => (
  <div
    key={item._id}
    className="h-32 rounded-xl flex items-end p-3 text-white font-medium bg-cover bg-center capitalize"
    style={{ backgroundImage: "url(/images/vb2.png)" }}
  >
    {item.title}
  </div>
))
) : (
  <p className="text-sm text-gray-500">No videos available.</p>
)
}

  </div>
</section>


      {/* Journal */}
      <section className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={()=>route.push("/journal")}>
        <h2 className="text-lg font-semibold mb-4  flex items-center gap-2">
  <Journal/>Journal</h2>
        <div className="bg-[#eef0ff] p-4 rounded-xl text-sm">
          <p className="font-medium">How are you feeling?</p>
          <p className="text-gray-700 mb-3">I will lose 30 pounds</p>

          <p className="font-medium">When are you feeling?</p>
          <p className="text-gray-700 mb-3">January 1, 2025</p>

          <p className="font-medium">Your current Mood?</p>
          <p className="text-gray-700 mb-3">
            I'm committed to making my health a top priority...
          </p>

          <p className="font-medium">Elaborate more:</p>
          <p className="text-gray-700">
            I'm committed to making my health a top priority...
          </p>
        </div>
      </section>
    </div>
  );
}
