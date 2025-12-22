"use client";

import { MoreVertical, ArrowRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddAudioModal from "./AddAudioModal";
import { getAudio ,deleteAudio, updateAudio} from "../../services/APIs/AudioVideoVoice";

const fallbackImages = [
  "/images/vb1.png",
  "/images/vb2.png",
];

export default function AudioSection() {
  const [openModal, setOpenModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

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

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchAudios();
  }, []);

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

        {/* Add Audio Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-[#5a5cff] text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90"
        >
          <Plus size={18} />
          Add Audio
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-sm text-gray-500">Loading playlists...</div>
      )}

      {/* PLAYLIST GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {playlists.map((p) => (
          <div
            key={p.id}
            className="relative h-48 rounded-2xl overflow-hidden shadow-md cursor-pointer group"
            style={{
              backgroundImage: `url(${p.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>

            {/* Menu */}
            <button className="absolute top-3 right-3 text-white">
              <MoreVertical size={18} />
            </button>

            {/* Title */}
            <div className="absolute left-4 bottom-4 text-white text-lg font-medium">
              {p.title}
            </div>

            {/* Arrow */}
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
        onSuccess={fetchAudios} // refetch after create
      />
    </div>
  );
}
