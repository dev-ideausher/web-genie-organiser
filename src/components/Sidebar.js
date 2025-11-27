"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Dashboard from "../app/(web)/dashboard/page";
import DashboardIcon from "../../public/icons/DashboardIcon";
import { TaskIcon, UserManagementIcon } from "../../public/icons/TaskIcon";
import CalenderIcon from "../../public/icons/CalenderIcon";
import { JournalIcon } from "../../public/icons/JournalIcon";
import { AskGenie } from "../../public/icons/AskGenie";
import { HoroscopeIcon } from "../../public/icons/HoroscopeIcon";
import { ProfileIcon } from "../../public/icons/ProfileIcon";
import { AV } from "../../public/icons/AVIcon";
import { GratitudeIcon } from "../../public/icons/GratitudeIcon";
import { VisionBoardIcon } from "../../public/icons/VisionBoardIcon";

export default function Sidebar({ toggleSidebar }) {
  const pathname = usePathname(); 
  const currentPath = pathname || "";
  const menuItems = [
    { name: "Dashboard", paths: ["/dashboard"], icon: DashboardIcon },
    { name: "Tasks", paths: ["/task"], icon: TaskIcon },
    { name: "Calender", paths: ["/calender"], icon: CalenderIcon },
    { name: "Journal", paths: ["/journal"], icon: JournalIcon },
    { name: "Audios & Videos", paths: ["/audios-and-videos"], icon:AV },
    { name: "Gratitude", paths: ["/gratitude"], icon: GratitudeIcon },
    { name: "Vision Board", paths: ["/visionBoard"], icon: VisionBoardIcon},
    { name: "Ask Genie", paths: ["/ask-genie"], icon: AskGenie},
    { name: "Horoscope", paths: ["/horoscope"], icon: HoroscopeIcon },
    { name: "Profile", paths: ["/profile"], icon: ProfileIcon },
  ];
  

  return (
    <div className="w-60 h-full text-black flex flex-col relative shadow-[0_0_10px_rgba(12,12,13,0.10)]">
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
      {menuItems.map(({ name, paths, icon: Icon }) => {
  const isActive = paths.some((p) => currentPath.startsWith(p));

  return (
    <Link
      key={name}
      href={paths[0]}
      onClick={() => window.innerWidth < 768 && toggleSidebar()}
      className={`flex items-center gap-3 p-4 rounded-xl transition-colors font-medium ${
        isActive ? "bg-primaryDisabled text-secondaryText" : "hover:bg-primaryDisabled"
      }`}
    >
      <Icon className={isActive ? "text-primary " : "text-secondaryText"} />
      <span className={isActive ? "text-primary " : "text-secondaryText"}>{name}</span>
    </Link>
  );
})}

      </nav>
    </div>
  );
}
