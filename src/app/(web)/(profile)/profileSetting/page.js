"use client";
import Image from "next/image";
import { Header } from "../../../../components/Header";

export default function AccountPage() {
  return (
    <div className=" w-full  bg-[#FCFDFF] text-black">
      <Header title="Profile Setting" />
    <div className="w-full p-6 flex">
      
  
   

      {/* Card */}
      <div className="w-full mt-2 flex justify-between">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-3xl">

          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/images/avatar.png"  
              width={60}
              height={60}
              alt="profile"
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">Alex Simmons</h2>
              <p className="text-sm text-gray-500">Alex21l6@gmail.com</p>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-5">

            <div>
              <label className="text-sm">Full Name</label>
              <input
                type="text"
                readOnly
                defaultValue="Alex Simmons"
                className="w-full mt-1 p-2 rounded-md bg-gray-100 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-sm">Phone No.</label>
              <input
                type="text"
                readOnly
                defaultValue="+1-123-123-1234"
                className="w-full mt-1 p-2 rounded-md bg-gray-100 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-sm">Select Date of Birth</label>
              <input
                type="text"
                readOnly
                defaultValue="15-07-1997"
                className="w-full mt-1 p-2 rounded-md bg-gray-100 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                readOnly
                defaultValue="Alex.simmons@gmail.com"
                className="w-full mt-1 p-2 rounded-md bg-gray-100 text-sm outline-none"
              />
            </div>

          </div>
        </div>
        <div className="ml-auto">
        <button className="border border-red-400 text-red-500 px-6 py-2 rounded-full hover:bg-red-50 transition">
          Delete Account
        </button>
      </div>
      </div>
    </div>
    </div>
  );
}
