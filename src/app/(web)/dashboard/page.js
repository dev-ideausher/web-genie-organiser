import React from 'react'

export default function Dashboard() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <p className="text-gray-600 text-xs">Today • Everyday • 02:30 PM</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Calendar */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Calendar</h2>
          <div className="bg-[#f5f6ff] p-4 rounded-lg text-center">
            <p className="font-medium">June 2023</p>
            <div className="grid grid-cols-7 gap-2 text-gray-600 text-sm mt-4">
              {[...Array(30).keys()].map((d) => (
                <div
                  key={d}
                  className={`p-2 rounded-lg ${d + 1 === 23 ? "bg-[#4a4bda] text-white" : ""}`}
                >
                  {d + 1}
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Audios */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Audios</h2>
          <div className="grid grid-cols-2 gap-4">
            {["My Tunes", "Sad Songs", "Travel", "UpBeat"].map((item) => (
              <div
                key={item}
                className="h-28 bg-gray-300 rounded-xl flex items-end p-3 text-white font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
  
        {/* Gratitude */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Gratitude</h2>
          <blockquote className="text-gray-700 italic text-sm">
            "Success is not final, failure is not fatal: It is the courage to continue that counts."<br />
            <span className="block mt-2 text-right">- Winston Churchill</span>
          </blockquote>
        </section>
  
        {/* Videos */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Videos</h2>
          <div className="flex flex-col gap-4">
            {["Gratitude", "Affirmations", "Inspirations", "Ted Talks"].map(
              (item) => (
                <div
                  key={item}
                  className="h-28 bg-gray-300 rounded-xl flex items-end p-3 text-white font-medium"
                >
                  {item}
                </div>
              )
            )}
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