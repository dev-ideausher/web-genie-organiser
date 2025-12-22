"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";


export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen text-black">
   

      <div className="w-full min-h-screen flex items-center justify-center text-black">
        <div className="bg-white rounded-3xl shadow-md w-full max-w-md p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-50 p-4 sm:p-5">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
            Payment Successful
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Your payment has been processed successfully. 
          </p>

        </div>

      </div>
    </div>
  );
}


