import React, { useRef } from "react";
import { registerApi} from  "./../../services/APIs/Login"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function SignupStep3({ prevStep, formData, setFormData }) {
  const fileRef = useRef(null);
  const router = useRouter();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: URL.createObjectURL(file) });
    }
  };
  const handleRegister = async () => {
    console.log("RAW FORM DATA:", formData);
  
    // REMOVE password fields before sending
    const payload = { ...formData };
    delete payload.password;
    delete payload.confirmPassword;
    delete payload.referral;  delete payload.profilePic;
    console.log("FINAL PAYLOAD SENT:", payload);
  
    const res = await registerApi(payload);
    if(res?.status)
      {
       toast.success("User registered successfully! ")
        setTimeout(()=>router.push("/"),2500)}
      }
  ;
  

  return (
    <div className="w-full max-w-md ">
      <h2 className="text-3xl font-semibold text-[#1E1E1E] mb-1">Profile Picture</h2>
      <p className="text-sm text-gray-500 mb-8">
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
