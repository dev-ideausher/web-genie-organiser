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
    <div>
      <h2 className="text-xl font-semibold mb-2">Signup</h2>
      <p className="text-sm text-gray-500 mb-6">Enter your details to continue</p>

      <input
        type="text"
        placeholder="Enter Full Name"
        className="w-full border p-2 rounded mb-3"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />

      <PhoneInput
        defaultCountry="IN"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
        className="border p-2 rounded w-full mb-3"
      />

      <input
        type="date"
        className="w-full border p-2 rounded mb-3"
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
      />

      <input
        type="text"
        placeholder="Referral Code (optional)"
        className="w-full border p-2 rounded mb-4"
        value={formData.referral}
        onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
      />

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
