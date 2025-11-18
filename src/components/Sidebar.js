"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ toggleSidebar }) {
  const pathname = usePathname(); 
  const currentPath = pathname || "";

  const menuItems = [
    { name: "Dashboard", paths: ["/dashboard"], icon: "/icons/DashboardIcon.svg" },
    { name: "Tasks", paths: ["/task", "/view-user"], icon: "/icons/UserManagementIcon.svg" },
    { name: "Calender", paths: ["/calender", "/view-adviser"], icon: "/icons/AdviserManagementIcon.svg" },
    { name: "Journal", paths: ["/journal", "/view-booking"], icon: "/icons/BookingManagementIcon.svg" },
    { name: "Audios & Videos", paths: ["/audios-and-videos"], icon: "/icons/FeesIcon.svg" },
    { name: "Gratitude", paths: ["/gratitude"], icon: "/icons/RevenueIcon.svg" },
    { name: "Vision Board", paths: ["/visionBoard"], icon: "/icons/NotificationManagementIcon.svg" },
    { name: "Ask Genie", paths: ["/ask-genie"], icon: "/icons/AnalayticsIcon.svg" },
    { name: "Horoscope", paths: ["/horoscope"], icon: "/icons/Help&suppIcon.svg" },
    { name: "Profile", paths: ["/profile"], icon: "/icons/Profile.svg" },
  ];

  return (
    <div className="w-60 h-full text-black flex flex-col relative">
      {/* Close button mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 text-black"
      >
        <svg width="24" height="24" fill="none">
          <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <nav className="flex-1 overflow-y-auto px-3 pt-12 md:pt-3 bg-white">
        {menuItems.map(({ name, paths }) => {
          const isActive = paths.some((p) => currentPath.startsWith(p));

          return (
            <Link
              key={name}
              href={paths[0]}
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
              className={`
                flex items-center gap-3 p-4 rounded-xl
                transition-colors 
                ${isActive ? "bg-[#eef0ff] text-black" : "hover:bg-[#eef0ff]"}
              `}
            >
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
