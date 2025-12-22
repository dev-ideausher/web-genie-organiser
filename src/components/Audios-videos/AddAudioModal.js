import { X, Plus } from "lucide-react";
import { useState } from "react";
import { createAudio } from "../../services/APIs/AudioVideoVoice";

export default function AddAudioModal({ open, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!title || !url) return;

    try {
      setLoading(true);

      await createAudio({
        title,
        url,
      });

      onSuccess?.();
      onClose();
      setTitle("");
      setUrl("");
    } catch (err) {
      console.error("Create audio failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#E6EAFF]">
          <h2 className="text-lg font-semibold">Add audio</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {/* Group */}
          <div>
            <label className="block text-sm font-medium mb-1">Group</label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none"
            >
              <option value="">Choose group</option>
              <option value="My Tunes">My Tunes</option>
              <option value="Sad Songs">Sad Songs</option>
              <option value="Travel">Travel</option>
              <option value="UpBeat">UpBeat</option>
            </select>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium mb-1">Link</label>
            <input
              type="text"
              placeholder="Paste link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none"
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
            {loading ? "Adding..." : "Add Audio"}
          </button>
        </div>
      </div>
    </div>
  );
}
