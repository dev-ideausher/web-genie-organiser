// "use client";

// import { X, Play, Pause } from "lucide-react";
// import { useRef, useState } from "react";

// export default function VoicePlayerModal({ voice, onClose }) {
//     console.log(voice,"hi")
//   const audioRef = useRef(null);
//   const [playing, setPlaying] = useState(false);

//   if (!voice) return null;

//   const togglePlay = () => {
//     if (!audioRef.current) return;

//     if (playing) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setPlaying(!playing);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl w-[520px] p-6 relative">
//         {/* CLOSE */}
//         <button
//           onClick={() => {
//             audioRef.current?.pause();
//             onClose();
//           }}
//           className="absolute top-4 right-4 text-gray-500"
//         >
//           <X />
//         </button>

//         {/* TITLE */}
//         <h3 className="text-center font-medium mb-4">
//           {voice.title}
//         </h3>

//         {/* WAVEFORM (UI only) */}
//         <div className="flex items-center justify-center gap-1 mb-6">
//           {Array.from({ length: 40 }).map((_, i) => (
//             <div
//               key={i}
//               className="w-[3px] bg-indigo-400 rounded"
//               style={{ height: `${Math.random() * 40 + 10}px` }}
//             />
//           ))}
//         </div>

//         {/* PLAY */}
//         <div className="flex justify-center">
//           <button
//             onClick={togglePlay}
//             className="w-16 h-16 rounded-full border border-indigo-500 flex items-center justify-center text-indigo-600"
//           >
//             {playing ? <Pause size={28} /> : <Play size={28} />}
//           </button>
//         </div>

//         {/* AUDIO */}
//         <audio ref={audioRef} src={voice.url} />
//       </div>
//     </div>
//   );
// }
"use client";

import { X, Play, Pause } from "lucide-react";
import { useRef, useState } from "react";

export default function VoicePlayerModal({ voice, onClose }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!voice) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  /* 🎯 SEEK ON CLICK */
  const handleSeek = (e) => {
    if (!progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    audioRef.current.currentTime = percent * duration;
    audioRef.current.play();
    setPlaying(true);
  };

  const progressPercent = duration
    ? (currentTime / duration) * 100
    : 0;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[520px] p-6 relative">
        {/* CLOSE */}
        <button
          onClick={() => {
            audioRef.current?.pause();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500"
        >
          <X />
        </button>

        {/* TITLE */}
        <h3 className="text-center font-medium mb-6">
          {voice.title}
        </h3>

        {/* 🔊 LINEAR PROGRESS BAR */}
        <div
          ref={progressRef}
          onClick={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-8"
        >
          <div
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* PLAY / PAUSE */}
        <div className="flex justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full border border-indigo-500 flex items-center justify-center text-indigo-600"
          >
            {playing ? <Pause size={28} /> : <Play size={28} />}
          </button>
        </div>

        {/* AUDIO */}
        <audio
          ref={audioRef}
          src={voice.content?.url || voice.url}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => setPlaying(false)}
        />
      </div>
    </div>
  );
}
