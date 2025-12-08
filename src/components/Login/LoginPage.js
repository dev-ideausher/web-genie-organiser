"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOff, Eye } from "lucide-react";
import useFirebaseAuth from "../../services/auth/useFirebaseAuth";
import { toast } from "react-toastify";
import { LoginApi } from "./../../services/APIs/Login";
import { setToken, setUser,getToken,getUser } from "@/src/services/auth/userCookies";
import { googleProvider,appleProvider, auth } from "@/src/services/auth/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
export default function Login() {
  const { forgotPassword, loginWithEmailAndPassword, userLogin } =
    useFirebaseAuth();
    const handleGoogleLogin = async () => {
      try {
        setLoading(true);
    
        const res = await signInWithPopup(auth, googleProvider);
        const firebaseToken = await res.user.getIdToken();
        const userData = await LoginApi(firebaseToken);
    
        if (userData.status) {
          setToken(firebaseToken, userData.expiryTime);
          setUser(userData.data);
          toast.success("Login successful!");
          router.push("/dashboard");
        } else {
          toast.error(userData.message||"Login failed");
        }
      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      } finally {
        setLoading(false);
      }
    };
    
  
    const handleAppleLogin = async () => {
      try {
        const res = await signInWithPopup(auth, appleProvider);
        console.log("Apple User:", res.user);
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(()=>console.log(getToken()),[])
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
try{
  let userAuthData = await loginWithEmailAndPassword(fields.email, fields.password)

  if (userAuthData?.status) {
      let userData = await LoginApi(userAuthData.token)

      if (userData.status) {
          setToken(userAuthData.token, userAuthData.expiryTime)
          setUser(userData.data)
          toast.success("Login successful!");
      router.push("/dashboard");
      }
      else{
        toast.error( "Login failed");
      }

  }
}
     catch (error) {
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
      <div className="flex justify-center items-center bg-white px-8 sm:m-6 rounded-[32px] ">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-[#1E1E1E] mb-1">
            Hello, Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Login to your account below
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

            <div className="mb-2">
              <label className="text-sm text-gray-700">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={fields.password}
                  onChange={passwordHandler}
                  disabled={loading}
                  required
                  className="border-[#E1E1E1] bg-[#FAFAFA] w-full border rounded-xl px-4 py-2 mt-1 pr-10 outline-none"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <p
              className=" text-sm text-[#5B4EEC] cursor-pointer mb-5"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password?
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#5B4EEC] text-white py-3 rounded-xl font-medium transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#4C3FDB]"
              }`}
            >
              {loading ? "Processing..." : "Log In"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <span className="flex-grow border-b border-[#E1E1E1]" />
              <span className="mx-3 text-gray-500">or</span>
              <span className="flex-grow border-b border-[#E1E1E1]" />
            </div>

            {/* Google Login */}
            <button
              type="button"    onClick={handleGoogleLogin}
              className="w-full border border-[#E1E1E1] py-3 rounded-xl flex items-center justify-center gap-3 mb-3"
            >
              <Image src="/svg/google.svg" alt="Google" width={20} height={20} />
              Continue with Gmail
            </button>

            {/* Apple Login */}
            <button
              type="button"    onClick={handleAppleLogin}
              className="w-full border border-[#E1E1E1] py-3 rounded-xl flex items-center justify-center gap-3"
            >
              <Image src="/svg/apple.svg" alt="Apple" width={20} height={20} />
              Continue with Apple
            </button>

            <p className="mt-6 text-center text-sm">
              Don’t have an account?{" "}
              <span
                className="text-[#5B4EEC] cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
