"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { horoscopeApi } from "../../../../services/APIs/Horoscope";
import { useState, useEffect } from "react";


const initialHoroscopeData = {
    horoscope: "Loading your daily horoscope...",
    lucky_number: null,
    life_impact_text: "Loading your life impact details...",
};

export default function HoroscopeDetailPage() {
  const { id } = useParams(); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const gender = searchParams.get('gender');

  const [horoscopeData, setHoroscopeData] = useState(initialHoroscopeData);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!id || !gender) {
      console.error("Missing sign ID or gender in URL.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const body = {
      sign: id,
      gender: gender,
    };

    console.log("Fetching horoscope for:", body);

 
    horoscopeApi(body)
      .then((response) => {
        if (response.status && response.data) {
          const apiData = response.data;
         // console.log(apiData)
          const lifeImpactText = apiData.man || "No specific life impact text available for this sign/gender.";

          setHoroscopeData({
            horoscope: apiData.horoscope,
            lucky_number: apiData.lucky_number,
            life_impact_text: gender==="female"?apiData.woman:apiData.man,
          });
        } else {
          console.error("API call failed:", response.message);
          setHoroscopeData({ 
            ...initialHoroscopeData, 
            horoscope: "Failed to load horoscope.",
            life_impact_text: "Failed to load life impact.",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching horoscope:", error);
        setHoroscopeData({ 
            ...initialHoroscopeData, 
            horoscope: "An error occurred while fetching the horoscope.",
            life_impact_text: "An error occurred while fetching life impact.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, gender]); 

  // --- Display Loading State ---

if (loading) {
  return (

      <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a4bda] mx-auto mb-4"></div>
              <p className="text-xl font-medium text-[#4a4bda] capitalize">
                  Loading {id} Horoscope for {gender}...
              </p>
          </div>
      </div>
  );
}

  // --- Component Render ---
  return (
    <div className="p-6">
      {/* Back Button */}
      <button 
        onClick={() => router.push("/horoscope")}
        className="flex items-center gap-2 text-gray-700 mb-6 hover:text-[#4a4bda] transition"
      >
        <span>←</span> Back to Horoscope Signs
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 bg-white shadow rounded-2xl p-6 mb-6">
        <Image 
          src={`/signs/${id}.png`}
          alt={`${id} zodiac sign`} 
          width={80} 
          height={80} 
          className="rounded-full object-contain"
        />

        <div>
          <h2 className="text-2xl font-bold capitalize">
            {id} Horoscope 
          </h2>
          <p className="text-lg capitalize text-gray-600">
            {gender} | Lucky Number: **{horoscopeData.lucky_number ?? 'N/A'}**
          </p>
        </div>
      </div>

      {/* Daily Horoscope */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3 text-[#4a4bda]"> 
            Daily Horoscope 
        </h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {horoscopeData.horoscope}
        </p>
      </div>

      {/* Life Impact */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold mb-3 text-[#4a4bda] capitalize"> 
            {id} {gender} Personality
        </h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {horoscopeData.life_impact_text}
        </p>
      </div>
    </div>
  );
}