"use client"

import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useFirebaseAuth from "../../services/auth/useFirebaseAuth"
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";

export default function Layout({ children }) {
  const { logOut } = useFirebaseAuth();
  const router = useRouter();


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((v) => !v);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsDropdownOpen((o) => !o);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logOut()
      .then(() => {
        toast.success("Logging out..");
        router.push("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageTitles = {
    "/dashboard":   "Home",
    "/user-management":   "Tasks",
    "/adviser-management":   "Calendar",
    "/booking-management":   "Journal",
    "/fees-and-subscriptions":"Videos & Audios",
    "/revenue-management":  "Gratitude",
    "/notification-management":   "Vision board",
    "/analytics-and-reports":  "Ask Genie",
    "/help-and-support":  "Horoscope",
    "/profile":  "Profile",
  };

  return (
    <div className="flex h-screen overflow-hidden text-black">
      {/* Sidebar wrapper */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-60 text-black
          transform transition-transform duration-300 ease-in-out

          /* mobile: slide off/on */
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          /* md+: always on-screen */
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Backdrop for mobile (click to close) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}

{/* NAVBAR */}
<header className="md:hidden flex items-center gap-4 p-4 bg-white shadow-md">
  {/* Hamburger for mobile */}
  <button
    onClick={toggleSidebar}
    className="md:hidden text-black"
  >
    <svg width="28" height="28" fill="none">
      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  </button>

  <h1 className="text-lg font-semibold"></h1>
</header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-white text-black">
          {children}
        </main>
      </div>
    </div>
  );
}