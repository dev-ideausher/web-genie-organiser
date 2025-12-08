"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Header } from "../../../../components/Header";
import { getProfileAPI } from "../../../../services/APIs/Profile";
import { toast } from "react-toastify";
import { Check } from "lucide-react";

export default function ReferralPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileAPI();
        if (res?.status) setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const referralCode = profile?.referralCode || "";


  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="w-full min-h-screen text-black">
      <Header title="Referral" />

      <div className="mt-[44px] bg-white rounded-[32px] shadow-md p-5 w-[700px] ml-5">
        <Image
          src="/images/referralImg.png"
          width={380}
          height={380}
          alt="Referral"
        />

        <p className="mt-4 text-sm text-gray-600">Your Referral Code</p>

        <div className="flex items-center mt-1 bg-[#f5f5f7] p-3 rounded-xl">
          <input
            value={referralCode}
            readOnly
            className="flex-1 bg-transparent outline-none font-medium"
          />

<button onClick={copyCode} className="p-2 flex items-center gap-1 cursor-pointer">
{copied ? <Check className="text-[#787878]"/> :<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
 <path d="M7.75 13.75C7.75 10.9216 7.75 9.50736 8.62868 8.62868C9.50736 7.75 10.9216 7.75 13.75 7.75L14.75 7.75C17.5784 7.75 18.9926 7.75 19.8713 8.62868C20.75 9.50736 20.75 10.9216 20.75 13.75V14.75C20.75 17.5784 20.75 18.9926 19.8713 19.8713C18.9926 20.75 17.5784 20.75 14.75 20.75H13.75C10.9216 20.75 9.50736 20.75 8.62868 19.8713C7.75 18.9926 7.75 17.5784 7.75 14.75L7.75 13.75Z" stroke="#787878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M15.7499 7.75C15.7475 4.79291 15.7028 3.26121 14.842 2.21243C14.6758 2.00989 14.4901 1.82418 14.2876 1.65796C13.1812 0.75 11.5375 0.75 8.25 0.75C4.96252 0.75 3.31878 0.75 2.21243 1.65796C2.00989 1.82417 1.82418 2.00989 1.65796 2.21243C0.75 3.31878 0.75 4.96252 0.75 8.25C0.75 11.5375 0.75 13.1812 1.65796 14.2876C1.82417 14.4901 2.00989 14.6758 2.21243 14.842C3.26121 15.7028 4.79291 15.7475 7.75 15.7499" stroke="#787878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
}
  {copied ? "Copied" : "Copy"}
</button>

        </div>
      </div>
    </div>
  );
}
