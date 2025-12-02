import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { setToken } from "../../services/auth/userCookies";
import { auth } from "../../services/auth/firebaseConfig";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignupStep1({ nextStep, formData, setFormData }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    const { email, password, confirmPassword } = formData;
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.accessToken;
      setToken(token);
      nextStep();
    } catch (err) {
      let errorMessage = "Something went wrong. Please try again.";
      if (err.code === "auth/email-already-in-use") errorMessage = "This email is already registered.";
      else if (err.code === "auth/invalid-email") errorMessage = "Invalid email address.";
      else if (err.code === "auth/weak-password") errorMessage = "Password should be at least 6 characters.";
      else if (err.code === "auth/network-request-failed") errorMessage = "Network error. Check your internet connection.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-semibold text-[#1E1E1E] mb-1">Create Account</h1>
      <p className="text-sm text-gray-500 mb-8">Let’s create your account and get started!</p>

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 outline-none border-[#E1E1E1] bg-[#FAFAFA]"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {/* Password */}
      <div className="mb-4 relative">
        <label className="text-sm text-gray-700">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          className="border-[#E1E1E1] bg-[#FAFAFA] w-full border rounded-xl px-4 py-2 mt-1 pr-10 outline-none"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <div
          className="absolute right-3 top-[38px] cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-4 relative">
        <label className="text-sm text-gray-700">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter Password"
          className="border-[#E1E1E1] bg-[#FAFAFA] w-full border rounded-xl px-4 py-2 mt-1 pr-10 outline-none"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
        <div
          className="absolute right-3 top-[38px] cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={loading}
        className="bg-[#5b5fc7] text-white rounded-full py-2 w-full hover:bg-[#4a4fb0] transition"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="mt-6 text-center text-sm">
        By continuing, you agree to Genie Organizer's{" "}
        <span
          className="text-[#5B4EEC] cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Terms & Conditions and Privacy Policy
        </span>
      </p>
      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <span
          className="text-[#5B4EEC] cursor-pointer"
          onClick={() => router.push("/")}
        >
          Log In
        </span>
      </p>
    </div>
  );
}
