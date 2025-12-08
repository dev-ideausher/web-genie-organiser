"use client";

import { usePathname, useRouter } from "next/navigation";
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
import { removeToken, removeUser } from "../services/auth/userCookies";
import ContactIcon from "../../public/icons/ContactIcon";

export default function Sidebar({ toggleSidebar }) {
  const router = useRouter();
  const pathname = usePathname(); 
  const currentPath = pathname || "";
  const handleLogout = () => {
    removeToken();
    removeUser();
    router.push("/");
  };

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
    { name: "Contacts", paths: ["/contacts"], icon: ContactIcon },
    { name: "Profile", paths: ["/profile","/profileSetting","/notifications","/resetPassword","/subscription","/paymentMethods","/support","/refer","/review"], icon: ProfileIcon },
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
})}  <button
onClick={handleLogout}
className="p-4 bottom-5 absolute h-9 flex items-center gap-2 hover:bg-primary-2 cursor-pointer"
>
<p className="flex items-center gap-2 text-[#777] text-body-1 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5" stroke="#777777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>Logout</p>
</button>

      </nav>
    
    </div>
  );
}
