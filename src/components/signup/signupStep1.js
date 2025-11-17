import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { setToken } from "../../services/Firebase/cookie";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignupStep1({ nextStep, formData, setFormData }) {
  const [loading, setLoading] = useState(false);

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
      
        if (err.code === "auth/email-already-in-use") {
          errorMessage = "This email is already registered. ";
        } else if (err.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        } else if (err.code === "auth/weak-password") {
          errorMessage = "Password should be at least 6 characters.";
        } else if (err.code === "auth/network-request-failed") {
          errorMessage = "Network error. Check your internet connection.";
        }
      
        toast.error(errorMessage);
      }
      finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <h2 className="text-xl font-semibold mb-2">Create Account</h2>
      <p className="text-sm text-gray-500 mb-6">Let’s create your account and get started!</p>

      <input
        type="email"
        placeholder="Enter Email"
        className="w-full border p-2 rounded mb-3"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Enter Password"
        className="w-full border p-2 rounded mb-3"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Re-enter Password"
        className="w-full border p-2 rounded mb-4"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />

      <button
        onClick={handleContinue}
        disabled={loading}
        className="bg-[#5b5fc7] text-white rounded-full py-2 w-full hover:bg-[#4a4fb0] transition"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </div>
  );
}
