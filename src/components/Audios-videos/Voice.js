"use client";

import { MoreVertical, ArrowRight, Plus, Pencil, Trash2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import AddVoiceModal from "./AddVoiceModal";
import { getVoice,updateVoice,deleteVoice } from "../../services/APIs/Voice";
import VoicePlayerModal from "./VoicePLayerModal";

const fallbackImages = ["/images/vb1.png", "/images/vb2.png"];

export default function VoiceSection() {
  const [openModal, setOpenModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playingVoice, setPlayingVoice] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  /* ---------------- FETCH Voice GROUPS ---------------- */
  const fetchVoices = async () => {
    try {
      setLoading(true);
      const res = await getVoice();
  
      const data =
        res?.data?.results?.map((item) => ({
          id: item._id,
          title: item.title,
          url: item.content?.url,   // 🔥 IMPORTANT
        })) || [];
  
      setPlaylists(data);
    } catch (err) {
      console.error("Failed to fetch Voice groups", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchVoices();
  }, []);

  /* ---------------- RENAME ---------------- */
  const handleRename = async () => {
    try {
      await updateVoice(renameId, { title: renameValue });
      setRenameId(null);
      setRenameValue("");
      fetchVoices();
    } catch (err) {
      console.error("Rename failed", err);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    try {
      await deleteVoice(deleteId);
      setDeleteId(null);
      fetchVoices();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Voice Playlists</h1>
          <p className="text-sm text-gray-500">
            Manage and organize your Voice collections
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-[#5a5cff] text-white px-4 py-2 rounded-lg shadow-md"
        >
          <Plus size={18} />
          Add Voice
        </button>
      </div>

   {/* VOICE LIST */}
<div className="max-w-xl bg-white rounded-2xl shadow-sm p-4 space-y-4">
  {playlists.map((p) => (
    <div
      key={p.id}
     className="relative flex items-center justify-between border-b border-[#E1E1E1] last:border-b-0 pb-3"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPlayingVoice(p)}
          className="w-10 h-10 rounded-full border border-indigo-500 flex items-center justify-center text-indigo-600"
        >
                         <Play className="text-[#6C63FF]" size={20} />
        </button>

        <div>
          <p className="font-medium text-sm">{p.title}</p>
     
        </div>
      </div>

      {/* MENU */}
      <button
        onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
      >
        <MoreVertical size={18} />
      </button>

      {openMenuId === p.id && (
  <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-36 z-50 border">
    <button
      onClick={() => {
        setRenameId(p.id);
        setRenameValue(p.title);
        setOpenMenuId(null);
      }}
      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full"
    >
      <Pencil size={14} /> Rename
    </button>

    <button
      onClick={() => {
        setDeleteId(p.id);
        setOpenMenuId(null);
      }}
      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
    >
      <Trash2 size={14} /> Delete
    </button>
  </div>
)}

    </div>
  ))}
</div>


      {/* ADD Voice MODAL */}
      <AddVoiceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchVoices}
      />

      {/* RENAME MODAL */}
      {renameId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="font-semibold mb-4">Rename Voice</h3>
            <input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setRenameId(null)}>Cancel</button>
              <button
                onClick={handleRename}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="font-semibold mb-3">Delete Voice</h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete this Voice?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {playingVoice && (
  <VoicePlayerModal
    voice={playingVoice}
    onClose={() => setPlayingVoice(null)}
  />
)}

    </div>
  );
}
