// NotificationsPage.js
"use client";
import { useState } from "react";
import { Bell, Mail } from "lucide-react";
import { Header } from "../../../../components/Header";

export default function NotificationsPage() {
  const [push, setPush] = useState(true);
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <div className=" w-full min-h-screen bg-[#FCFDFF] text-black">
      <Header title="Notifications" />
    <div className="p-6 w-full min-h-screen bg-[#f7f8fa] text-black">
      <h1 className="text-3xl font-semibold mb-2">Notifications</h1>
      <p className="text-gray-600 max-w-2xl mb-6">
        You can customize how you receive updates and alerts. Toggle each option
        to enable or disable specific notification types.
      </p>

      <div className="bg-white rounded-3xl shadow-md p-2 max-w-3xl w-full">
        {/* Push Notifications */}
        <NotificationRow
          icon={<Bell className="text-purple-500 w-6 h-6" />}
          title="Push notifications"
          subtitle="Receive push notifications on your device"
          enabled={push}
          toggle={() => setPush(!push)}
        />

        {/* In-App Notifications */}
        <NotificationRow
          icon={<Bell className="text-purple-500 w-6 h-6" />}
          title="In app notifications"
          subtitle="Show notifications while using the app"
          enabled={inApp}
          toggle={() => setInApp(!inApp)}
        />

        {/* Email Notifications */}
        <NotificationRow
          icon={<Mail className="text-purple-500 w-6 h-6" />}
          title="Email notifications"
          subtitle="Receive notifications via email"
          enabled={email}
          toggle={() => setEmail(!email)}
        />
      </div>
    </div>
    </div>
  );
}

function NotificationRow({ icon, title, subtitle, enabled, toggle }) {
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex items-start gap-4">
        {icon}
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      <button
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          enabled ? "bg-purple-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
            enabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
