"use client"
import React, { useState } from "react";
import { createEvent } from "../../../../services/APIs/Calender";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [notes, setNotes] = useState("");
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  /* ---------------- ADD PARTICIPANT ---------------- */
  const handleAddParticipant = (e) => {
    if (e.key === "Enter" && participantInput.trim()) {
      e.preventDefault();

      if (!participants.includes(participantInput.trim())) {
        setParticipants([...participants, participantInput.trim()]);
      }
      setParticipantInput("");
    }
  };

  /* ---------------- REMOVE PARTICIPANT ---------------- */
  const removeParticipant = (email) => {
    setParticipants(participants.filter((p) => p !== email));
  };

  /* ---------------- CREATE EVENT ---------------- */
  const handleCreateEvent = async () => {
    if (!title || !date || !time) {
      alert("Title, Date and Time are required");
      return;
    }

    // Combine date + time → ISO string
    const startDate = new Date(`${date}T${time}`).toISOString();

    const payload = {
      title,
      meetingLink,
      notes,
      participants,
      startDate,
    };

    try {
     const res= await createEvent(payload);
     if(res.status){
        toast.success("Event created successfully ");
        
   // Reset form
      setTitle("");
      setMeetingLink("");
      setNotes("");
      setParticipants([]);
      setParticipantInput("");
      setDate("");
      setTime("");
     }
     


    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Events</h2>

        <button
          onClick={handleCreateEvent}
          className="flex items-center gap-2 bg-[#6C6AF2] text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90"
        >
          <span className="text-lg">＋</span>
          Add Event
        </button>
      </div>

      {/* Card */}
      <div className="bg-white max-w-xl rounded-2xl shadow-lg p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-gray-900">
          Create a new event.
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Don't miss out on important events add them today!
        </p>

        <div className="h-px bg-gray-200 my-5" />

        {/* Meeting Link */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Meeting Link
          </label>
          <input
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            type="text"
            placeholder="Paste meeting link"
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C6AF2]"
          />
        </div>

        {/* Participants */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Participants Email
          </label>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-2">
            {participants.map((email) => (
              <div
                key={email}
                className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1 text-sm"
              >
                {email}
                <span
                  onClick={() => removeParticipant(email)}
                  className="cursor-pointer text-gray-500"
                >
                  ×
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <input
            type="email"
            placeholder="Type email & press Enter"
            value={participantInput}
            onChange={(e) => setParticipantInput(e.target.value)}
            onKeyDown={handleAddParticipant}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C6AF2]"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter title"
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C6AF2]"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C6AF2]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C6AF2]"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter notes"
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-[#6C6AF2]"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
