"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import useFirebaseAuth from "../../services/auth/useFirebaseAuth";
import { getToken, getUser } from "../../services/auth/userCookies";

export default function Layout({ children }) {
  const { logOut } = useFirebaseAuth();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const toggleDropdown = () => setIsDropdownOpen((o) => !o);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logOut()
      .then(() => {
        toast.success("Logging out..");
        router.push("/");
      })
      .catch(console.log);
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

  // Auth check
  useEffect(() => {
    const token = getToken();
    const user = getUser();

    if (!token || !user) {
      toast.warning("Please login", { autoClose: 2500 });
      setTimeout(() => router.push("/"), 2500);
    }

    setMounted(true); 
  }, [router]);

  if (!mounted) return <div className="flex justify-center items-center h-screen"><span>Loading...</span></div>;

  const token = getToken();
  const user = getUser();
  if (!token || !user) return null;

  return (
    <div className="flex h-screen overflow-hidden text-black">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-60 text-black
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-4 p-4 bg-white shadow-md">
          <button onClick={toggleSidebar} className="md:hidden text-black">
            <svg width="28" height="28" fill="none">
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold"></h1>
        </header>

        <main className="flex-1 overflow-y-auto bg-bg text-black">
          {children}
        </main>
      </div>
    </div>
  );
}
