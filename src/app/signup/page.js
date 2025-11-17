"use client";
import React, { useState } from "react";
import SignupStep1 from "../../components/signup/signupStep1";
import SignupStep2 from "../../components/signup/signupStep2";
import SignupStep3 from "../../components/signup/signupStep3";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    dob: "",
    referral: "",
    profilePic: null,
  });

  const nextStep = () => setStep((p) => p + 1);
  const prevStep = () => setStep((p) => p - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f6ff] px-6">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg w-full max-w-5xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-[#f6f4ff] flex flex-col items-center justify-center text-center p-10">
          <img src="/genie-logo.png" alt="logo" className="w-24 mb-6" />
          <h2 className="text-lg font-medium text-[#5b5fc7] mb-2 ">
            Organize your life
          </h2>
          <p className="text-[#5b5fc7] text-sm">
            Journal, tasks, calendar and more!
          </p>
          <img src="/signup-side-illustration.png" alt="illustration" className="mt-6 w-72" />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          {step === 1 && (
            <SignupStep1
              nextStep={nextStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <SignupStep2
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 3 && (
            <SignupStep3
              prevStep={prevStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
