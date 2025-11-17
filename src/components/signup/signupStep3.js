import React, { useRef } from "react";
import { loginApi } from "../../services/APIs/Login";

export default function SignupStep3({ prevStep, formData, setFormData }) {
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: URL.createObjectURL(file) });
    }
  };
  const handleRegister=async()=>
    {
        console.log(formData)
  const res=await loginApi(formData);
    }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Profile Picture</h2>
      <p className="text-sm text-gray-500 mb-6">
        Showcase your best self. Upload your profile picture now!
      </p>

      <div
        onClick={() => fileRef.current.click()}
        className="w-28 h-28 rounded-full border-2 border-dashed border-[#5b5fc7] flex items-center justify-center mx-auto cursor-pointer"
      >
        {formData.profilePic ? (
          <img
            src={formData.profilePic}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-[#5b5fc7] text-sm">+</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center mt-6 space-y-2">
        <button className="bg-[#5b5fc7] text-white rounded-full py-2 px-6 hover:bg-[#4a4fb0] w-1/2" onClick={handleRegister}>
      Signup
        </button>
        <button onClick={prevStep} className="text-[#5b5fc7] text-sm">
          Skip for now
        </button>
      </div>
    </div>
  );
}
