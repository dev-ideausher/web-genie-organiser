"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {
  return (
    <div className="p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={[
          { title: "Get Honey", date: "2025-12-17T09:00:00" },
          { title: "Grab Eggs", date: "2025-12-17T09:30:00" },
          { title: "Office", date: "2025-12-17T11:30:00" },
        ]}
        height="85vh"
      />
    </div>
  );
}
