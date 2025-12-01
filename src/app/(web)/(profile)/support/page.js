// ChatPage.js
"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical, Send } from "lucide-react";
import { Header } from "../../../../components/Header";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How can i assist you ?",
      sender: "other",
      time: "09:41 AM",
      avatar: "/images/avatar.png",
    },
    {
      id: 2,
      text: "Hi, Mandy",
      sender: "me",
      avatar: "/images/avatar.png",
    },
    {
      id: 3,
      text: "I've tried the app",
      sender: "me",
      avatar: "/images/avatar.png",
    },
    {
      id: 4,
      text: "Yeah, It's really good!",
      sender: "me",
      avatar: "/images/avatar.png",
    },
    {
      id: 5,
      text: "Hi! How can i assist you ?",
      sender: "other",
      avatar: "/images/avatar.png",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: message,
        sender: "me",
        avatar: "/avatar1.png",
      },
    ]);
    setMessage("");
  };

  return (
    <div className=" w-full min-h-screen bg-[#FCFDFF] text-black">
      <Header title="Support Chat" />
    <div className="w-full h-screen bg-[#f7f8fa] p-6 flex justify-center">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-4xl h-full flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#e9f0ff] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/images/avatar.png"
              width={40}
              height={40}
              alt="User"
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">Jane Cooper</p>
              <p className="text-gray-600 text-sm">Jane.Cooper@gmail.com</p>
            </div>
          </div>

          <MoreVertical className="text-gray-500" />
        </div>

        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-center text-gray-400 text-sm">09:41 AM</div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender !== "me" && (
                <Image
                  src={msg.avatar}
                  width={30}
                  height={30}
                  alt="avatar"
                  className="rounded-full"
                />
              )}

              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow-md ${
                  msg.sender === "me"
                    ? "bg-[#6b63ff] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === "me" && (
                <Image
                  src={msg.avatar}
                  width={30}
                  height={30}
                  alt="avatar"
                  className="rounded-full"
                />
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-4 bg-white p-4 border-t rounded-b-3xl">
          <button className="text-purple-500 text-3xl font-light">+</button>

          <input
            type="text"
            placeholder="Type your message"
            className="flex-1 bg-gray-100 px-4 py-3 rounded-full outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSend}
            className="bg-[#6b63ff] p-3 rounded-full text-white shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}