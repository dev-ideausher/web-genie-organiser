"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOff, Eye } from "lucide-react";
import useFirebaseAuth from "../../services/auth/useFirebaseAuth";
import { toast } from "react-toastify";
import { LoginApi } from "./../../services/APIs/Login";

export default function forgotPassword() {
  const { forgotPassword, loginWithEmailAndPassword, userLogin, setToken, setUser } =
    useFirebaseAuth();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordHandler = (e) => {
    setFields((prev) => ({ ...prev, password: e.target.value }));
  };

  const emailHandler = (e) => {
    setFields((prev) => ({ ...prev, email: e.target.value }));
  };

  // ✨ Firebase / Custom Login API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await LoginApi();

      if (!response.status) {
        toast.error(response.error || "Login failed");
        return;
      }

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error("Invalid email or password. Please try again.");
            break;
          case "auth/user-disabled":
            toast.error("This account has been disabled.");
            break;
          case "auth/user-not-found":
            toast.error("No user found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password. Please try again.");
            break;
          default:
            toast.error("Authentication failed. Please try again.");
        }
      } else {
        toast.error(error.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✨ Alternate login (if needed)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let userAuthData = await loginWithEmailAndPassword(
        fields.email,
        fields.password
      );

      if (userAuthData?.status) {
        let userData = await userLogin(userAuthData.token);

        if (userData.status) {
          setToken(userAuthData.token, userAuthData.expiryTime);
          setUser(userData.data);

          toast.success("Login successful");
          router.push("/user-management");
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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

      {/* RIGHT SECTION */}
      <div className="flex justify-center  bg-white px-8 sm:m-6 rounded-[32px] ">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-[#1E1E1E] mb-1 mt-20">
          Forgot Password
          </h1>
          <p className="text-[16px] text-gray-500 mb-8">
          Enter the email address for password reset instructions. If you have an account, you will receive an email with next steps
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={fields.email}
                onChange={emailHandler}
                disabled={loading}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 outline-none border-[#E1E1E1] bg-[#FAFAFA]"
              />
            </div>

          

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#5B4EEC] text-white py-3 rounded-xl font-medium transition my-6 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#4C3FDB]"
              }`}
            >
              {loading ? "Processing..." : "Continue"}
            </button>

     

            <p className="mt-6 text-center text-sm">
            
              <span
                className="text-[#5B4EEC] cursor-pointer"
                onClick={() => router.push("/signup")}
              >
     Go Back To Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
