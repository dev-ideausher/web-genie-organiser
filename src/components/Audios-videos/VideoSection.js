import { MoreVertical, ArrowRight, Plus } from "lucide-react";

const playlists = [
  {
    title: "My Tunes",
    image: "/images/vb1.png",
  },
  {
    title: "Sad Songs",
    image: "/images/vb2.png",
  },
  {
    title: "Travel",
    image: "/images/vb1.png",
  },
  {
    title: "UpBeat",
    image: "/images/vb2.png",
  },
];

export default function VideoSection() {
  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">video Playlists</h1>
          <p className="text-sm text-gray-500">
            Manage and organize your video collections
          </p>
        </div>

        {/* Add video Button */}
        <button className="flex items-center gap-2 bg-[#5a5cff] text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90">
          <Plus size={18} />
          Add video
        </button>
      </div>

      {/* PLAYLIST GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {playlists.map((p) => (
          <div
            key={p.title}
            className="relative h-48 rounded-2xl overflow-hidden shadow-md cursor-pointer group"
            style={{
              backgroundImage: `url(${p.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
       
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>

   
            <button className="absolute top-3 right-3 text-white">
              <MoreVertical size={18} />
            </button>


            <div className="absolute left-4 bottom-4 text-white text-lg font-medium">
              {p.title}
            </div>


            <button className="absolute bottom-3 right-3 text-white">
              <ArrowRight size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
