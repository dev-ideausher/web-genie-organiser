"use client";
import React, { useState } from "react";
import SignupStep1 from "../../components/signup/signupStep1";
import SignupStep2 from "../../components/signup/signupStep2";
import SignupStep3 from "../../components/signup/signupStep3";
import Image from "next/image";

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
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 font-poppins bg-[#ECF3FF]">

     {/* LEFT SECTION */}
     <div className="hidden md:flex flex-col justify-center px-12 bg-[#ECF3FF]">
        <Image
          src="/images/logo.png"
          alt="Genie Logo"
          width={138}
          height={100}
          className="mb-6"
        />

<p className="mt-12 text-[40px]  font-[600] text-[#7B6BDB] leading-[130%] tracking-[-1px]">
          Organize your life
    
<br/>
          journal, tasks, calendar and more!
        </p>

        <div className="mt-10">
          <Image
            src="/images/login.png"
            alt="Illustration"
            width={700}
            height={380}
          />
        </div>
      </div>

        {/* Right Section */}
        <div className="flex justify-center items-center bg-white px-8 sm:m-6 rounded-[32px]">
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
  );
}
