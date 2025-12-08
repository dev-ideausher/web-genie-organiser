"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Header } from "../../../../components/Header";
import { getProfileAPI } from "../../../../services/APIs/Profile";

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileAPI();
        if (res?.status) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a4bda] mx-auto mb-4"></div>
      <p className="text-xl font-medium text-[#4a4bda] capitalize">
          Loading ...
      </p>
  </div>

    );
  }

  return (
    <div className="w-full bg-[#FCFDFF] text-black">
      <Header title="Profile Setting" />

      <div className="w-full p-6 flex">
        <div className="w-full mt-2 flex justify-between">
          {/* Card */}
          <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-3xl">

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-8">
              <Image
                src={
                  profile?.profilePic
                    ? profile.profilePic
                    : "/images/avatar.png"
                }
                width={60}
                height={60}
                alt="profile"
                className="rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {profile?.fullName || "-"}
                </h2>
                <p className="text-sm text-gray-500">
                  {profile?.email || "-"}
                </p>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-5">
              <div>
                <label className="text-sm">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={profile?.fullName || ""}
                  className="w-full mt-1 p-2 rounded-md bg-gray-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Phone No.</label>
                <input
                  type="text"
                  readOnly
                  value={profile?.phone || ""}
                  className="w-full mt-1 p-2 rounded-md bg-gray-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Date of Birth</label>
                <input
                  type="text"
                  readOnly
                  value={
                    profile?.dob
                      ? new Date(profile.dob).toLocaleDateString("en-GB")
                      : ""
                  }
                  className="w-full mt-1 p-2 rounded-md bg-gray-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  readOnly
                  value={profile?.email || ""}
                  className="w-full mt-1 p-2 rounded-md bg-gray-100 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* Delete Button */}
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
