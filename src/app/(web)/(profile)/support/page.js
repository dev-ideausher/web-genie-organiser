"use client";

import { useEffect, useState ,useRef} from "react";
import Image from "next/image";
import { Send, Plus, PaperclipIcon } from "lucide-react";
import { Header } from "../../../../components/Header";
import {
  createTicket,
  getChatsHistoryAPI,
  getChatsById,
  sendMessage,
} from "../../../../services/APIs/SupportChat";
import { Paperclip, X } from "lucide-react";

export default function ChatPage() {

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }
    setAttachment(file);
  };
  
  

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const res = await getChatsHistoryAPI();
      if (res?.status) {
        setTickets(res.data.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTickets(false);
    }
  };


  const openTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setLoadingMessages(true);

    try {
      const res = await getChatsById(ticket._id);
      if (res?.status) {
        setMessages(res.data.messages.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  
  const handleSendMessage = async () => {
    if (!messageText.trim() && !attachment) return;
  
    const formData = new FormData();
    formData.append("message", messageText);
    if (attachment) {
      formData.append("attachments", attachment);
    }
  
    try {
      const res = await sendMessage(formData, selectedTicket._id);
  
      if (res?.status) {
        setMessages((prev) => [...prev, res.data]);
        setMessageText("");
        setAttachment(null);
      }
    } catch (err) {
      console.error(err);
    }
  };
  


  const handleCreateTicket = async () => {
    if (!subject.trim() || !description.trim()) return;
  
    setCreating(true);
    try {
      await createTicket({ subject, description });
      setShowModal(false);
      setSubject("");
      setDescription("");
      fetchTickets();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };
  
  const AttachmentPreview = ({ file, isUser }) => {
    if (file.type === "image") {
      return (
        <a href={file.url} target="_blank">
          <img
            src={file.url}
            alt="attachment"
            className="rounded-lg max-w-[200px] border"
          />
        </a>
      );
    }
  
    return (
      <a
        href={file.url}
        target="_blank"
        className={`flex items-center gap-1 text-xs underline ${
          isUser ? "text-white" : "text-blue-600"
        }`}
      >
       <PaperclipIcon className="w-4"/> Download file
      </a>
    );
  };
  
  return (
    <div className="w-full  text-black">
      <Header title="Support Chat" />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] p-4 lg:p-6 gap-4 lg:gap-6">

      <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow p-4 flex flex-col max-h-[40vh] lg:max-h-full overflow-y-auto">

        <button
  onClick={() => setShowModal(true)}
  className="mb-4 flex items-center gap-2 bg-[#6b63ff] text-white px-4 py-2 rounded-xl cursor-pointer"
>
  <Plus size={18} /> New Ticket
</button>


          {loadingTickets ? (
              <div className="text-center mt-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a4bda] mx-auto mb-4"></div>
              <p className="text-xl font-medium text-[#4a4bda] capitalize">
                  Loading ...
              </p>
          </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => openTicket(ticket)}
                className={`p-3 rounded-xl cursor-pointer mb-2 ${
                  selectedTicket?._id === ticket._id
                    ? "bg-[#e9f0ff]"
                    : "hover:bg-gray-100"
                }`}
              >
                <p className="font-medium">{ticket.subject}</p>
                <p className="text-xs text-gray-500">{ticket.ticketId}</p>
              </div>
            ))
          )}
        </div>

  
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow flex flex-col min-h-[50vh] ">

          {!selectedTicket ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm text-center px-4">

              Select a ticket to view messages
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b font-medium border-gray-400">
                {selectedTicket.subject}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3">

                {loadingMessages ? (
                 <div className="text-center mt-20">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a4bda] mx-auto mb-4"></div>
                 <p className="text-xl font-medium text-[#4a4bda] capitalize">
                     Loading ...
                 </p>
             </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        msg.senderType === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                  <div
  className={`px-4 py-2 rounded-xl max-w-sm text-sm ${
    msg.senderType === "user"
      ? "bg-[#6b63ff] text-white"
      : "bg-gray-100"
  }`}
>
  {/* Message Text */}
  {msg.message && <p>{msg.message}</p>}

  {/* Attachments */}
  {msg.attachments?.length > 0 && (
    <div className="mt-2 space-y-2">
      {msg.attachments.map((file) => (
        <AttachmentPreview
          key={file._id}
          file={file}
          isUser={msg.senderType === "user"}
        />
      ))}
    </div>
  )}
</div>

                    </div>
                  ))
                )}
              </div>
              {attachment && (
  <div className="px-4 pb-2 flex items-center gap-2 text-sm">
    <span className="bg-gray-100 px-3 py-1 rounded-full">
      {attachment.name}
    </span>
    <button onClick={() => setAttachment(null)}>
      <X size={14} />
    </button>
  </div>
)}

              {/* Input */}
              <div className="p-3 flex items-center gap-2 lg:gap-3">
  
  {/* Attachment */}
  <button
    onClick={() => fileInputRef.current.click()}
    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
  >
    <Paperclip size={18} />
  </button>

  <input
    ref={fileInputRef}
    type="file"
    hidden
    onChange={handleFileChange}
  />

  <input
    value={messageText}
    onChange={(e) => setMessageText(e.target.value)}
    placeholder="Type your message..."
    className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none"
  />

  <button
    onClick={handleSendMessage}
    className="bg-[#6b63ff] p-3 rounded-full text-white cursor-pointer"
  >
    <Send size={18} />
  </button>
</div>

            </>
          )}
        </div>
        {showModal && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
 <div className="bg-white w-[90%] max-w-[420px] rounded-2xl p-5 lg:p-6 shadow-xl">

      <h2 className="text-lg font-semibold mb-4 ">Create Support Ticket</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-xl outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue"
            className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-xl outline-none resize-none"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-xl border border-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateTicket}
          disabled={creating}
          className="px-4 py-2 rounded-xl bg-[#6b63ff] text-white disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
