"use client";

import { MoreVertical, ArrowRight, Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddAudioModal from "./AddAudioModal";
import {
  getAudio,
  deleteAudio,
  updateAudio,
} from "../../services/APIs/AudioVideoVoice";

const fallbackImages = ["/images/vb1.png", "/images/vb2.png"];

export default function AudioSection() {
  const [openModal, setOpenModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  /* ---------------- FETCH AUDIO GROUPS ---------------- */
  const fetchAudios = async () => {
    try {
      setLoading(true);
      const res = await getAudio();

      const data =
        res?.data?.results?.map((item, index) => ({
          id: item._id,
          title: item.title,
          image: fallbackImages[index % fallbackImages.length],
        })) || [];

      setPlaylists(data);
    } catch (err) {
      console.error("Failed to fetch audio groups", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  /* ---------------- RENAME ---------------- */
  const handleRename = async () => {
    try {
      await updateAudio(renameId, { title: renameValue });
      setRenameId(null);
      setRenameValue("");
      fetchAudios();
    } catch (err) {
      console.error("Rename failed", err);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    try {
      await deleteAudio(deleteId);
      setDeleteId(null);
      fetchAudios();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Audio Playlists</h1>
          <p className="text-sm text-gray-500">
            Manage and organize your audio collections
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-[#5a5cff] text-white px-4 py-2 rounded-lg shadow-md"
        >
          <Plus size={18} />
          Add Audio
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {playlists.map((p) => (
          <div
            key={p.id}
            className="relative h-48 rounded-2xl overflow-hidden shadow-md group"
            style={{
              backgroundImage: `url(${p.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20" />

            {/* MENU BUTTON */}
            <button
              onClick={() =>
                setOpenMenuId(openMenuId === p.id ? null : p.id)
              }
              className="absolute top-3 right-3 text-white z-10"
            >
              <MoreVertical size={18} />
            </button>

            {/* DROPDOWN */}
            {openMenuId === p.id && (
              <div className="absolute top-10 right-3 bg-white rounded-lg shadow-lg w-40 z-20">
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
                  <Trash2 size={14} /> Delete Group
                </button>
              </div>
            )}

            {/* TITLE */}
            <div className="absolute left-4 bottom-4 text-white text-lg font-medium">
              {p.title}
            </div>

            <button className="absolute bottom-3 right-3 text-white">
              <ArrowRight size={20} />
            </button>
          </div>
        ))}

        {/* EMPTY STATE */}
        {!loading && playlists.length === 0 && (
          <div className="text-sm text-gray-500">
            No audio playlists found
          </div>
        )}
      </div>

      {/* ADD AUDIO MODAL */}
      <AddAudioModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchAudios}
      />

      {/* RENAME MODAL */}
      {renameId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="font-semibold mb-4">Rename Audio</h3>
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
            <h3 className="font-semibold mb-3">Delete Audio</h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete this audio?
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
    </div>
  );
}
