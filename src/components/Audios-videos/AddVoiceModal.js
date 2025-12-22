import { X, Plus } from "lucide-react";
import { useState } from "react";
import { createVoice } from "../../services/APIs/Voice";

export default function AddVoiceModal({ open, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [voiceFile, setVoiceFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!title || !voiceFile) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("voiceNote", voiceFile); // 

      await createVoice(formData);

      onSuccess?.();
      onClose();
      setTitle("");
      setVoiceFile(null);
    } catch (err) {
      console.error("Create Voice failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#E6EAFF]">
          <h2 className="text-lg font-semibold">Add Voice</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Voice Note #1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none"
            />
          </div>

          {/* FILE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Voice
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setVoiceFile(e.target.files[0])}
              className="w-full border rounded-xl px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 pb-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#5a5cff] text-white py-3 rounded-xl text-sm font-medium hover:opacity-90"
          >
            <Plus size={18} />
            {loading ? "Adding..." : "Add Voice"}
          </button>
        </div>
      </div>
    </div>
  );
}
