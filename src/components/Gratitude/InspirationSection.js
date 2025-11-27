import React from 'react'
import Heart from '../../../public/icons/Heart';
import Notes from '../../../public/icons/Notes';
import { IdeaBulb } from '../../../public/icons/IdeaBulb';


function InspirationSection() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  
        {/* Daily Inspirations */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="font-semibold text-lg mb-4 flex gap-1 items-center "><IdeaBulb/>Daily Inspirations</h2>
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-[#fafafa] rounded-xl mb-3 shadow-sm">
              <p className="italic text-gray-700">
                "Success is not final, failure is not fatal: It is the courage to continue that counts."
              </p>
              <p className="text-right mt-2 text-sm font-semibold">
                - Winston Churchill
              </p>
            </div>
          ))}
        </div>
  
        {/* My Favorites */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="font-semibold text-lg mb-4 flex gap-1 items-center "><Heart/>My Favorites</h2>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-[#fafafa] rounded-xl mb-3 shadow-sm">
              “I am capable of achieving my goals and I embrace the journey ahead”.
            </div>
          ))}
        </div>
  
        {/* My Own Inspirations */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="font-semibold text-lg mb-4 flex gap-1 items-center "><Notes/>My Own Inspirations</h2>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-[#eef3ff] rounded-xl mb-3 shadow-sm"
            >
              <p className="text-gray-700 w-[85%]">I am capable of achieving my goals and I embrace the journey ahead.
              </p>
              <button className="text-gray-400 text-xl"><Heart/></button>
            </div>
          ))}
        </div>
  
        {/* Add Inspirations */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="font-semibold text-lg mb-4 flex gap-1 items-center "><Notes/>Add Inspirations</h2>
  
          <textarea
            placeholder="Start writing here..."
            className="w-full h-40 p-4 rounded-xl bg-[#fafafa] focus:outline-[#6c63ff] border border-gray-200"
          ></textarea>
  
          <div className="flex justify-center mt-4">
            <button className="bg-[#6c63ff] text-white px-6 py-2 rounded-full shadow-md transition">
              Add Quote
            </button>
          </div>
        </div>
      </div>
    );
  }

export default InspirationSection