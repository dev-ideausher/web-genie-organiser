"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function HoroscopeDetailPage() {
  const { id } = useParams();  
  const router = useRouter();

  return (
    <div className="p-6">
      {/* Back Button */}
      <button 
        onClick={() => router.push("/horoscope")}
        className="flex items-center gap-2 text-gray-700 mb-6"
      >
        <span>←</span> Horoscope
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 bg-white shadow rounded-2xl p-6 mb-6">
        <Image 
  src={`/signs/${id}.png`}

          alt="zodiac" 
          width={80} 
          height={80} 
          className="rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold capitalize">
            {id} Horoscope
          </h2>
          <p>20.08.2025</p>
        </div>
      </div>

      {/* Daily Horoscope */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-2"> Daily Horoscope</h3>
        <p className="text-gray-700">
          Embrace new opportunities with open arms...
        </p>
      </div>

      {/* Life Impact */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2"> Life Impact</h3>
        <p className="text-gray-700">
          Your creativity knows no bounds...
        </p>
      </div>
    </div>
  );
}
