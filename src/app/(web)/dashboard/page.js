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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5 bg-bg">
      {/* Today's Tasks */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M11.833 19.3636C11.833 20.3661 11.833 20.8674 11.9968 21.2628C12.2151 21.79 12.634 22.2088 13.1612 22.4272C13.5566 22.591 14.0579 22.591 15.0604 22.591H19.3636C20.3661 22.591 20.8674 22.591 21.2628 22.4272C21.79 22.2088 22.2088 21.79 22.4272 21.2628C22.591 20.8674 22.591 20.3661 22.591 19.3636C22.591 18.3611 22.591 17.8598 22.4272 17.4644C22.2088 16.9372 21.79 16.5183 21.2628 16.3C20.8674 16.1362 20.3661 16.1362 19.3636 16.1362H15.0604C14.0579 16.1362 13.5566 16.1362 13.1612 16.3C12.634 16.5183 12.2151 16.9372 11.9968 17.4644C11.833 17.8598 11.833 18.3611 11.833 19.3636ZM11.833 19.3636H9.89653C8.69152 19.3636 8.08902 19.3636 7.62876 19.1291C7.22391 18.9228 6.89476 18.5936 6.68848 18.1888C6.45397 17.7285 6.45397 17.126 6.45397 15.921V9.68137M6.45397 9.68137H19.3636C20.3661 9.68137 20.8674 9.68137 21.2628 9.51759C21.79 9.29922 22.2088 8.88036 22.4272 8.35315C22.591 7.95775 22.591 7.45649 22.591 6.45397C22.591 5.45145 22.591 4.95019 22.4272 4.55478C22.2088 4.02758 21.79 3.60872 21.2628 3.39034C20.8674 3.22656 20.3661 3.22656 19.3636 3.22656H6.45397C5.45145 3.22656 4.95019 3.22656 4.55478 3.39034C4.02758 3.60872 3.60872 4.02758 3.39034 4.55478C3.22656 4.95019 3.22656 5.45145 3.22656 6.45397C3.22656 7.45649 3.22656 7.95775 3.39034 8.35315C3.60872 8.88036 4.02758 9.29922 4.55478 9.51759C4.95019 9.68137 5.45145 9.68137 6.45397 9.68137Z" stroke="#4736F5" strokeWidth="2.1516" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
          Today's Tasks</h2>
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
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M3.22656 9.68137H22.591M7.52977 3.22656V5.37817M18.2878 3.22656V5.37817M6.45397 13.9846H8.60557M6.45397 18.2878H8.60557M11.833 13.9846H13.9846M11.833 18.2878H13.9846M17.212 13.9846H19.3636M17.212 18.2878H19.3636M6.66913 22.591H19.1484C20.3534 22.591 20.9559 22.591 21.4162 22.3565C21.821 22.1502 22.1502 21.821 22.3565 21.4162C22.591 20.9559 22.591 20.3534 22.591 19.1484V8.82073C22.591 7.61572 22.591 7.01322 22.3565 6.55296C22.1502 6.14811 21.821 5.81896 21.4162 5.61268C20.9559 5.37817 20.3534 5.37817 19.1484 5.37817H6.66913C5.46412 5.37817 4.86161 5.37817 4.40136 5.61268C3.99651 5.81896 3.66735 6.14811 3.46107 6.55296C3.22656 7.01322 3.22656 7.61572 3.22656 8.82073V19.1484C3.22656 20.3534 3.22656 20.9559 3.46107 21.4162C3.66735 21.821 3.99651 22.1502 4.40136 22.3565C4.86161 22.591 5.46412 22.591 6.66913 22.591Z" stroke="#4736F5" strokeWidth="2.1516" strokeLinecap="round" strokeLinejoin="round"/>
</svg>Calendar</h2>

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
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M13.4447 9.56436V19.9028M13.4447 9.56436V5.99974C13.4447 5.77668 13.4447 5.66515 13.482 5.57025C13.515 5.48645 13.5684 5.41226 13.6375 5.35449C13.7157 5.28908 13.8215 5.25381 14.0332 5.18327L18.7667 3.60543C19.1491 3.47794 19.3404 3.4142 19.4926 3.45242C19.6258 3.48587 19.7412 3.56904 19.8151 3.68487C19.8995 3.81718 19.8995 4.01876 19.8995 4.4219V7.98652C19.8995 8.20958 19.8995 8.32111 19.8622 8.41601C19.8292 8.49981 19.7757 8.574 19.7067 8.63177C19.6284 8.69719 19.5226 8.73246 19.311 8.80299L14.5775 10.3808C14.195 10.5083 14.0038 10.5721 13.8516 10.5338C13.7183 10.5004 13.6029 10.4172 13.5291 10.3014C13.4447 10.1691 13.4447 9.96751 13.4447 9.56436ZM13.4447 19.9028C13.4447 21.3881 11.7589 22.5923 9.67937 22.5923C7.59985 22.5923 5.91406 21.3881 5.91406 19.9028C5.91406 18.4174 7.59985 17.2132 9.67937 17.2132C11.7589 17.2132 13.4447 18.4174 13.4447 19.9028Z" stroke="#4736F5" strokeWidth="2.1516" strokeLinecap="round" strokeLinejoin="round"/>
</svg>Audios</h2>

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
        <h2 className="text-lg font-semibold mb-4  flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M12.6539 16.9526L14.3897 17.5916H20.7267C22.3931 17.5916 22.8095 18.9299 22.7971 19.5254L15.7538 22.1552C15.3386 22.3101 14.8512 22.2751 14.4241 22.1552L8.65569 20.5361V11.9082H10.4577L17.4235 14.5336C18.6284 14.9876 18.1981 16.6056 17.1346 16.7175M4.86511 11.9496C5.91939 11.9496 6.76928 12.8129 6.76928 13.886V20.4161C6.76928 21.4887 5.91939 22.3526 4.86511 22.3526C3.81028 22.3526 2.96094 21.4887 2.96094 20.4161V13.886C2.96094 12.8129 3.81028 11.9496 4.86511 11.9496ZM18.5235 12.5628L21.5675 9.50642C22.7229 8.34563 22.8864 7.54362 22.8611 6.29731C22.8315 4.83745 21.4529 3.53788 19.7612 3.46687C18.9941 3.4346 18.0684 3.78693 17.1782 4.53353C16.288 3.78693 15.3622 3.4346 14.5952 3.46687C12.9035 3.53788 11.5249 4.83745 11.4953 6.29731C11.47 7.54362 11.6335 8.34563 12.7889 9.50642L15.8334 12.5628C16.1497 12.8801 16.5279 13.1292 17.1782 13.1292C17.8285 13.1292 18.2072 12.8807 18.5235 12.5628Z" stroke="#4736F5" strokeWidth="2.1516" strokeLinecap="round" strokeLinejoin="round"/>
</svg>Gratitude</h2>
        <blockquote className="text-gray-700 italic text-sm">
          "Success is not final, failure is not fatal: It is the courage to
          continue that counts."
          <br />
          <span className="block mt-2 text-right">- Winston Churchill</span>
        </blockquote>
      </section>

      {/* Videos */}
      <section className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M17.212 10.7583L19.9841 9.09501C20.8374 8.58305 21.264 8.32707 21.615 8.35979C21.9211 8.38832 22.2004 8.54644 22.3823 8.79423C22.591 9.0784 22.591 9.57593 22.591 10.571V15.2488C22.591 16.2438 22.591 16.7414 22.3823 17.0256C22.2004 17.2733 21.9211 17.4315 21.615 17.46C21.264 17.4927 20.8374 17.2367 19.9841 16.7248L17.212 15.0615M6.66913 19.3647H13.7694C14.9744 19.3647 15.5769 19.3647 16.0372 19.1302C16.442 18.9239 16.7712 18.5948 16.9775 18.1899C17.212 17.7297 17.212 17.1271 17.212 15.9221V9.037C17.212 8.13324 17.212 7.68137 17.0361 7.33618C16.8814 7.03254 16.6345 6.78567 16.3309 6.63096C15.9857 6.45508 15.5338 6.45508 14.6301 6.45508H5.80849C4.90473 6.45508 4.45285 6.45508 4.10766 6.63096C3.80402 6.78567 3.55716 7.03254 3.40245 7.33618C3.22656 7.68137 3.22656 8.13324 3.22656 9.037V15.9221C3.22656 17.1271 3.22656 17.7297 3.46107 18.1899C3.66735 18.5948 3.99651 18.9239 4.40136 19.1302C4.86161 19.3647 5.46412 19.3647 6.66913 19.3647Z" stroke="#4736F5" strokeWidth="2.1516" strokeLinecap="round" strokeLinejoin="round"/>
</svg>Videos</h2>

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
        <h2 className="text-lg font-semibold mb-4  flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M8.60789 7.5298H4.30469M8.60789 12.9088H4.30469M8.60789 18.2878H4.30469M12.9111 3.22656V22.591M9.89886 22.591H18.0749C19.28 22.591 19.8825 22.591 20.3427 22.3565C20.7476 22.1502 21.0767 21.8211 21.283 21.4162C21.5175 20.956 21.5175 20.3535 21.5175 19.1485V6.66916C21.5175 5.46415 21.5175 4.86165 21.283 4.40139C21.0767 3.99654 20.7476 3.66739 20.3427 3.46111C19.8825 3.2266 19.28 3.2266 18.0749 3.2266H9.89886C8.69385 3.2266 8.09134 3.2266 7.63109 3.46111C7.22624 3.66739 6.89708 3.99654 6.6908 4.40139C6.45629 4.86165 6.45629 5.46415 6.45629 6.66916V19.1485C6.45629 20.3535 6.45629 20.956 6.6908 21.4162C6.89708 21.8211 7.22624 22.1502 7.63109 22.3565C8.09134 22.591 8.69385 22.591 9.89886 22.591Z" stroke="#4736F5" strokeWidth="2.1516" strokeLinecap="round" strokeLinejoin="round"/>
</svg>Journal</h2>
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
