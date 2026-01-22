"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getCalenderEvents } from "../../../services/APIs/Calender";
import { Calendar, Phone } from "lucide-react";

export default function CalendarPage() {
  const router = useRouter();
  const calendarRef = useRef(null);

  const dateInputRef = useRef(null);
  
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);

  /* ---------------- FETCH EVENTS ---------------- */
  const fetchData = async () => {
    try {
      const response = await getCalenderEvents(month, year, search);

      const calendarEvents =
        response?.data?.results?.flatMap((dayItem) =>
          dayItem.events.map((event) => ({
            id: event._id,
            title: event.title,
            start: event.startDate,
            extendedProps: {
              meetingLink: event.meetingLink,
              participants: event.participants,
              notes: event.notes,
            },
          }))
        ) || [];

      setEvents(calendarEvents);
    } catch (error) {
      console.error("Failed to fetch calendar events", error);
    }
  };

  /* ---------------- INITIAL & FILTER FETCH ---------------- */
  useEffect(() => {
    fetchData();
  }, [month, year, search]);

  /* ---------------- CALENDAR NAVIGATION ---------------- */
  const handleDatesSet = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;
  
    const currentDate = calendarApi.getDate();
  
    setMonth(currentDate.getMonth() + 1); // 1–12 
    setYear(currentDate.getFullYear());   
    setSelectedDate(currentDate);         
  };
  

  return (
    <div className="p-6 bg-[#F6F7FB] min-h-screen">
      {/* 🔝 TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Today Date */}
        {/* Date Picker */}
<div
  onClick={() => dateInputRef.current?.showPicker()}
  className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border text-sm font-medium cursor-pointer"
>
  <Calendar className="text-primary w-4"/> {selectedDate.toLocaleDateString("en-GB")}

  <input
    ref={dateInputRef}
    type="date"
    value={selectedDate.toISOString().split("T")[0]}
    onChange={(e) => {
      const newDate = new Date(e.target.value);
    
      setSelectedDate(newDate);
    
      const calendarApi = calendarRef.current?.getApi();
      calendarApi?.gotoDate(newDate);

    }}
    
    className="absolute opacity-0 pointer-events-none"
  />
</div>


          {/* Sync */}
          <button
            onClick={fetchData}
            className="flex items-center gap-2 text-sm font-medium text-indigo-600"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
  <path d="M23 2.24763V8.24763M23 8.24763H17M23 8.24763L18.36 3.88763C17.2853 2.81235 15.9556 2.02684 14.4952 1.60441C13.0348 1.18198 11.4911 1.13639 10.0083 1.47189C8.52547 1.8074 7.1518 2.51307 6.01547 3.52305C4.87913 4.53304 4.01717 5.81442 3.51 7.24763M1 18.2476V12.2476M1 12.2476H7M1 12.2476L5.64 16.6076C6.71475 17.6829 8.04437 18.4684 9.50481 18.8909C10.9652 19.3133 12.5089 19.3589 13.9917 19.0234C15.4745 18.6879 16.8482 17.9822 17.9845 16.9722C19.1209 15.9622 19.9828 14.6808 20.49 13.2476" stroke="#6563FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg> Sync Calendar
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Call Icon */}
          <button
            onClick={() => router.push("/contacts")}
            className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center"
          >
            <Phone size={18} />
          </button>
          <button
            onClick={() => router.push("/calender/createEvent")}
            className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
  <g clipPath="url(#clip0_7089_64004)">
    <path d="M17.6434 2.52V20.16H2.52344V2.52H7.56344C7.56344 2.17219 7.62906 1.84734 7.76031 1.54547C7.89156 1.24359 8.07203 0.974531 8.30172 0.738281C8.53141 0.502031 8.79719 0.321562 9.09906 0.196875C9.40094 0.0721875 9.72906 0.0065625 10.0834 0C10.4313 0 10.7561 0.065625 11.058 0.196875C11.3598 0.328125 11.6289 0.508594 11.8652 0.738281C12.1014 0.967969 12.2819 1.23375 12.4066 1.53562C12.5313 1.8375 12.5969 2.16563 12.6034 2.52H17.6434ZM6.30344 5.04H13.8634V3.78H11.3434V2.52C11.3434 2.34281 11.3106 2.17875 11.245 2.02781C11.1794 1.87688 11.0908 1.74563 10.9792 1.63406C10.8677 1.5225 10.7331 1.43062 10.5756 1.35844C10.4181 1.28625 10.2541 1.25344 10.0834 1.26C9.90625 1.26 9.74219 1.29281 9.59125 1.35844C9.44031 1.42406 9.30906 1.51266 9.1975 1.62422C9.08594 1.73578 8.99406 1.87031 8.92188 2.02781C8.84969 2.18531 8.81688 2.34938 8.82344 2.52V3.78H6.30344V5.04ZM16.0192 9.26297L14.6805 7.92422L8.19344 14.4113L5.48641 11.7042L4.14766 13.043L8.19344 17.0887L16.0192 9.26297Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_7089_64004">
      <rect width="20.16" height="20.16" fill="white"/>
    </clipPath>
  </defs>
</svg>
          </button>
        </div>
      </div>

      {/* 📅 CALENDAR */}
      <div className="bg-white rounded-xl shadow-sm p-3">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          height="80vh"
          datesSet={handleDatesSet}
        />
      </div>
    </div>
  );
}
