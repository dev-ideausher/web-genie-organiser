"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getVisionBoardApi } from "../../../services/APIs/VisionBoard";

export default function VisionBoard() {
  const router = useRouter();
  const [myPics, setMyPics] = useState([]);
  const [loading, setLoading] = useState(true);   

  const fetchVisionBoard = async () => {
    try {
      setLoading(true);
      const res = await getVisionBoardApi();

      if (res?.status && res?.data?.images) {
        setMyPics(res.data.images.map((img) => img.url));
      }
    } catch (error) {
      console.log("Error fetching vision board:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchVisionBoard();
  }, []);

  return (
    <div className="p-6">
      {/* Top Buttons */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => router.push("/visionBoard/create")}
          className="px-5 py-2 bg-[#6C63FF] text-white rounded-xl shadow-md flex items-center gap-2 "
        >
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>Create Board
        </button>

        <button   onClick={() => router.push("/visionBoard/progressTracker")} className="flex items-center gap-2 px-5 py-2 border border-[#6C63FF] rounded-xl text-[#6C63FF] shadow-md">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.8" y="0.8" width="17.6" height="17.6" rx="8.8" stroke="#6563FF" strokeWidth="1.6"/>
<circle cx="9.59844" cy="9.60039" r="2.4" fill="#6563FF" stroke="#6563FF" strokeWidth="1.6"/>
</svg>
  Progress Tracker
        </button>
      </div>

      {/* Main Vision Board Banner */}
      <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden mb-6">
        <Image
          src="/images/visionBoard.png"
          alt="Vision Board"
          width={1200}
          height={1600}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="font-semibold text-lg mb-3">My Pics</h2>

      {/* Loader */}
      {loading ? (
        <div className="w-full flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6C63FF] border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {myPics.length > 0 ? (
            myPics.map((pic, index) => (
              <div key={index} className="rounded-xl overflow-hidden h-72 shadow-md">
                <Image
                  src={pic}
                  alt="User Pic"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No images found.</p>
          )}
        </div>
      )}
    </div>
  );
}
