"use client";

import { Header } from "../../../../components/Header";

export default function ChangePassword() {
  return (
    <div className=" w-full   text-black">
      <Header title="Reset Password" />
    <div className="w-full  p-6 flex">
      
   

      {/* Card */}
      <div className="w-full mt-2 flex justify-between">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-3xl space-y-6">
          
          <div>
            <h1 className="text-2xl font-semibold">Change Password</h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter the email address for password reset instructions.  
              If you have an account, you will receive an email with next steps.
            </p>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm">Enter Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full mt-1 p-3 rounded-md bg-gray-100 text-sm outline-none"
            />
          </div>

          {/* New Password Field */}
          <div>
            <label className="text-sm">Enter New Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full mt-1 p-3 rounded-md bg-gray-100 text-sm outline-none"
            />
          </div>
              {/* New Password Field */}
              <div>
            <label className="text-sm">Confirm New Password</label>
            <input
              type="password"
              placeholder="confirm New Password"
              className="w-full mt-1 p-3 rounded-md bg-gray-100 text-sm outline-none"
            />
          </div>

        </div>
           {/* Continue Button */}
      <div className="ml-auto">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-2 rounded-full transition">
          Continue
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}
