"use client";
import { getToken } from "../../../services/auth/userCookies";
import React from "react";

export default function Dashboard() {
  const today = new Date();

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

 // console.log(getToken());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5">
      {/* Today's Tasks */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((x) => (
            <div
              key={x}
              className="bg-[#eef0ff] p-4 rounded-lg text-sm shadow-sm"
            >
              <p className="font-semibold">Buy Eggs</p>
              <p className="text-gray-600 text-xs">
                Today • Everyday • 02:30 PM
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Calendar</h2>

        <div className="bg-[#f5f6ff] p-4 rounded-xl">
          <p className="font-medium text-lg">
            {monthName} {year}
          </p>

          {/* Week headings */}
          <div className="grid grid-cols-7 text-gray-500 text-sm mt-4">
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
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Audios</h2>

        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "My Tunes", img: "/images/vb1.png" },
            { title: "Sad Songs", img: "/images/vb2.png" },
            { title: "Travel", img: "/images/vb1.png" },
            { title: "UpBeat", img: "/images/vb2.png" },
          ].map((item) => (
            <div
              key={item.title}
              className="h-32 rounded-xl flex items-end p-3 text-white font-medium bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.img})`,
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </section>

      {/* Gratitude */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Gratitude</h2>
        <blockquote className="text-gray-700 italic text-sm">
          "Success is not final, failure is not fatal: It is the courage to
          continue that counts."
          <br />
          <span className="block mt-2 text-right">- Winston Churchill</span>
        </blockquote>
      </section>

      {/* Videos */}
      <section className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-lg font-semibold mb-4">Videos</h2>

  <div className="flex flex-col gap-4">
    {[
      { title: "Gratitude", img: "/images/vb1.png" },
      { title: "Affirmations", img: "/images/vb2.png" },
      { title: "Inspirations", img: "/images/vb1.png" },
      { title: "Ted Talks", img: "/images/vb2.png" },
    ].map((item) => (
      <div
        key={item.title}
        className="h-28 rounded-xl flex items-end p-3 text-white font-medium bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.img})`,
        }}
      >
        {item.title}
      </div>
    ))}
  </div>
</section>


      {/* Journal */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Journal</h2>
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
