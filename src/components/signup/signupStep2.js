import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

export default function SignupStep2({ nextStep, prevStep, formData, setFormData }) {
  const handleContinue = () => {
    if (!formData.fullName || !formData.phone || !formData.dob) {
      toast.error("Please fill all required fields");
      return;
    }
    nextStep();
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold text-[#1E1E1E] mb-1">Signup</h2>
      <p className="text-sm text-gray-500 mb-8">Enter your details to continue</p>
      <div className="mb-4">
      <label className="text-sm text-gray-700">Full Name</label>
      <input
        type="text"
        placeholder="Enter Full Name"
                               className="border-[#E1E1E1] bg-[#FAFAFA] w-full border rounded-xl px-4 py-2 mt-1 pr-10 outline-none"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />
</div>  <div className="mb-4">
<label className="text-sm text-gray-700">Phone number</label>
      <PhoneInput
        defaultCountry="IN"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
                         className="border-[#E1E1E1] bg-[#FAFAFA] w-full border rounded-xl px-4 py-2 mt-1 pr-10 outline-none"
      />
</div>  <div className="mb-4">
<label className="text-sm text-gray-700">Select Date Of Birth</label>
      <input
        type="date"
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        value={formData.dob}
                       className="border-[#E1E1E1] bg-[#FAFAFA] w-full border rounded-xl px-4 py-2 mt-1 pr-10 outline-none"
      />
</div>
<div className="mb-4">
<label className="text-sm text-gray-700">Referral Code </label>
      <input
        type="text"
        placeholder="Referral Code (optional)"
                            className="border-[#E1E1E1] bg-[#FAFAFA] w-full border rounded-xl px-4 py-2 mt-1 pr-10 outline-none"
        value={formData.referral}
        onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
      />
</div>
      <div className="flex justify-between">
        <button onClick={prevStep} className="text-[#5b5fc7]">Back</button>
        <button
          onClick={handleContinue}
          className="bg-[#5b5fc7] text-white rounded-full py-2 px-6 hover:bg-[#4a4fb0]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
