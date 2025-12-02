"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const zodiacSigns = [
    { id: "aquarius", name: "Aquarius", image: "/signs/aquarius.png" },
    { id: "taurus", name: "Taurus", image: "/signs/taurus.png" },
    { id: "cancer", name: "Cancer", image: "/signs/cancer.png" },
    { id: "capricorn", name: "Capricorn", image: "/signs/capricorn.png" },
    { id: "aries", name: "Aries", image: "/signs/aries.png" },
    { id: "scorpio", name: "Scorpio", image: "/signs/scorpio.png" },
    { id: "sagittarius", name: "Sagittarius", image: "/signs/sagittarius.png" },
    { id: "gemini", name: "Gemini", image: "/signs/gemini.png" },
    { id: "leo", name: "Leo", image: "/signs/leo.png" },
    { id: "pisces", name: "Pisces", image: "/signs/pisces.png" },
    { id: "libra", name: "Libra", image: "/signs/libra.png" },
    { id: "virgo", name: "Virgo", image: "/signs/virgo.png" },
  ];
  
export default function HoroscopePage() {
    const router = useRouter();


    const handleNavigation = (signId, gender) => {
        router.push(`/horoscope/${signId}?gender=${gender}`);
    };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-8">Horoscope</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {zodiacSigns.map((sign) => (
          <div
            key={sign.name}

            onClick={() => {
                console.log(sign.id)
              //  router.push(`/horoscope/${sign.id}`) // Default click action
            }}
           
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
          >
            {/* Title */}
            <h2 className="text-xl font-bold mb-4 text-[#4a4bda]">
              {sign.name}
            </h2>

            {/* Image */}
            <Image
              src={sign.image}
              alt={sign.name}
              width={120}
              height={120}
              className="mb-1"
            />

            {/* Buttons */}
            <div className="flex gap-3 ">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleNavigation(sign.id, 'male');
                }}
                className="bg-lightPurple border border-[#4a4bda] text-[#4a4bda] px-4 py-1 rounded-lg hover:bg-[#4a4bda] hover:text-white transition"
              >
                Male
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleNavigation(sign.id, 'female');
                }}
                className="bg-lightPurple border border-[#4a4bda] text-[#4a4bda] px-4 py-1 rounded-lg hover:bg-[#4a4bda] hover:text-white transition"
              >
                Female
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Icon (Bottom Right) */}
      <div className="fixed bottom-6 right-6 bg-white  rounded-full flex items-center justify-center cursor-pointer">
        <Image
          src="/VA.png"
          alt="icon"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
}