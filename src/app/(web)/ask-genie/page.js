"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  Plus,
  Folder,
  Search,
  Mic,
  Send,
  PenSquare,
  RefreshCcw,
} from "lucide-react";

import {
  getAllConversation,
  getAllMessage,
  deleteChat,
  sendMessage,
} from "../../../services/APIs/AskGenie";

export default function ChatUI() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const projects = ["My savings-plan", "Books research", "Portfolio study"];

  // Fetch messages on load
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await getAllMessage();
      if (res?.status) {
        setMessages(res.data.messages || []);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  //  Send message
  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMsg = {
      role: "user",
      content: input,
      responseId: null,
      createdAt: new Date().toISOString(),
    };
  
    // optimistic UI
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
  
    try {
      const res = await sendMessage({ message: userMsg.content });
  
      if (res?.status) {
        //  REFRESH CHAT AFTER SUCCESS
        await fetchMessages();
      }
    } catch (err) {
      console.error("Send message failed", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* ---------------- SIDEBAR ---------------- */}
      <div
        className={`transition-all duration-300 bg-[#fafafa] h-full ${
          openSidebar ? "w-64" : "w-14"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="p-2 rounded-md bg-white hover:bg-gray-50"
          >
            <Menu size={20} />
          </button>
        </div>

        {openSidebar && (
          <div className="px-4 py-5">
            <h2 className="text-gray-600 text-sm mb-3">Projects</h2>

            <button className="flex items-center gap-2 text-[#6A50FF] mb-4">
              <Plus size={18} /> Add a Project
            </button>

            <div className="space-y-3">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <Folder size={18} className="text-gray-500" />
                  <span className="text-gray-700">{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---------------- MAIN ---------------- */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 bg-[#f2f2f7] px-4 py-2 rounded-full w-[280px]">
            <Search size={18} className="text-gray-500" />
            <input
              placeholder="Search"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 bg-[#6A50FF]/10 rounded-full text-[#6A50FF]">
              <PenSquare size={20} />
            </button>
            <button className="p-3 bg-[#6A50FF]/10 rounded-full text-[#6A50FF]">
              <RefreshCcw size={20} />
            </button>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-12 flex flex-col gap-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-[#6A50FF] text-white self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="text-sm text-gray-400 self-start">
              Genie is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white px-6 py-4 flex items-center gap-4">
          <button className="p-3 bg-[#6A50FF]/10 rounded-xl text-[#6A50FF]">
            <Plus size={20} />
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message"
            className="flex-1 px-4 py-3 border rounded-xl outline-none"
          />

          <button className="p-3 bg-[#f5f3ff] rounded-full text-[#6A50FF]">
            <Mic size={20} />
          </button>

          <button
            onClick={handleSend}
            className="p-3 bg-[#6A50FF] rounded-full text-white"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
