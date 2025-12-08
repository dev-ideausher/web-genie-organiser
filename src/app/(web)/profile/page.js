"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Settings,
  Bell,
  Lock,
  CreditCard,
  DollarSign,
  HelpCircle,
  Share2,
  Star,
  ChevronRight,
} from "lucide-react";
import { useEffect } from "react";
import { getUser } from "../../../services/auth/userCookies";

export default function ProfilePage() {
  const router = useRouter();
useEffect(()=>console.log(getUser()),[])
  const accountItems = [
    { label: "Profile Setting", icon: <Settings size={20} />, link: "/profileSetting" },
    { label: "Notifications", icon: <Bell size={20} />, link: "/notifications" },
    { label: "Reset Password", icon: <Lock size={20} />, link: "/resetPassword" },
    { label: "Subscription", icon: <DollarSign size={20} />, link: "/subscription" },
    { label: "Payment Methods", icon: <CreditCard size={20} />, link: "/paymentMethods" },
  ];

  const generalItems = [
    { label: "Support", icon: <HelpCircle size={20} />, link: "/support" },
    { label: "Refer a friend", icon: <Share2 size={20} />, link: "/refer" },
    { label: "Review", icon: <Star size={20} />, link: "/review" },
  ];

  return (
    <div className="p-6 w-4/5">
      {/* Header */}
      <h1 className="text-3xl font-semibold">Profile</h1>
      <p className="text-gray-500">Manage your account settings and preferences</p>

      {/* Profile Card */}
      <div className="mt-6 bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-gray-100">
        <Image
          src={getUser()?.profilePic||"/images/avatar.png"}
          width={60}
          height={60}
          className="rounded-full"
          alt="user"
        />

        <div>
          <h2 className="font-semibold text-lg">{getUser()?.fullName}</h2>
          <p className="text-gray-500">{getUser()?.email}</p>
        </div>
      </div>

      {/* Account Section */}
      <h2 className="mt-8 mb-2 text-gray-600 font-medium">Account</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {accountItems.map((item, i) => (
          <div
            key={i}
            onClick={() => router.push(item.link)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition border-b border-[#F5F5F5] last:border-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-indigo-500">{item.icon}</span>
              <span className="text-gray-800">{item.label}</span>
            </div>

            <ChevronRight size={20} className="text-gray-400" />
          </div>
        ))}
      </div>

      {/* General Section */}
      <h2 className="mt-8 mb-2 text-gray-600 font-medium">General</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {generalItems.map((item, i) => (
          <div
            key={i}
            onClick={() => router.push(item.link)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition border-b border-[#F5F5F5] last:border-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-indigo-500">{item.icon}</span>
              <span className="text-gray-800">{item.label}</span>
            </div>

            <ChevronRight size={20} className="text-gray-400" />
          </div>
        ))}
      </div>


      <h2 className="mt-8 mb-2 text-gray-600 font-medium">General</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {generalItems.map((item, i) => (
          <div
            key={i}
            onClick={() => router.push(item.link)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition border-b border-[#F5F5F5] last:border-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-indigo-500">{item.icon}</span>
              <span className="text-gray-800">{item.label}</span>
            </div>

            <ChevronRight size={20} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
