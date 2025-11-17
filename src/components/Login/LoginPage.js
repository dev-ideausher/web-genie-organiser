"use client";
import React, { useState } from "react";
import Image from "next/image";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await loginApi
    (email, password);
    console.log("Login API Response:", response);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f4f3fc] to-[#e5ebfe]">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-16 bg-gradient-to-br from-[#f4f3fc] to-[#f0f2ff]">
        <div className="flex items-center gap-2 mb-6">
          <Image src="/images/logo.png" alt="Genie Organizer Ai" width={40} height={40} />
        </div>

        <h2 className="text-4xl font-semibold text-[#5b4bff] leading-tight mb-4">
          Organize your life
        </h2>
        <p className="text-[#7b7b9b] text-lg">journal, tasks, calendar and more!</p>

        <div className="mt-10">
          <Image src="/images/login.png" alt="Organizer Illustration" width={400} height={300} className="object-contain" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 m-6 sm:px-12 md:px-20 bg-white rounded-none lg:rounded-[32px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#222]">Hello, Welcome Back</h1>
        <p className="text-gray-500 mb-8">Login to your account below</p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5b4bff] outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5b4bff] outline-none"
          />
        </div>

        <div className="flex justify-end mb-6">
          <a href="#" className="text-[#5b4bff] text-sm font-medium hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-[#4b3fff] transition-all"
          onClick={handleLogin}
        >
          Log In
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <button className="w-full py-3 mb-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          Continue with Gmail
        </button>

        <button className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
          <Image src="/apple.svg" alt="Apple" width={20} height={20} />
          Continue with Apple
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#5b4bff] font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
