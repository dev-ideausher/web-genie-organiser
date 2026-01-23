// SubscriptionPage.js
"use client";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Header } from "../../../../components/Header";
import { getSubscription ,createCheckout, getSubscriptionCurrent, getCard} from "../../../../services/APIs/Subscription";

export default function SubscriptionPage() {

  const [subscriptions, setSubscriptions] = useState([]);
  const [plan, setPlan] = useState(null);
  
  const features = [
    "3+ Tasks & Calendars",
    "3+ Journals",
    "Daily AI prompts",
    "View Compatibility, Love, Health, or Money",
    "Add 3+ Audios & Videos Links",
    "30 Questions per month",
    "3+ Habits",
    "3+ Contacts and Events",
  ];
  const FetchSubscription = async () => {
    try {
      const res = await getSubscription();
      const res1=await getSubscriptionCurrent();
      const res2=await getCard();
      const plans = res?.data?.results || [];
  
      setSubscriptions(plans);
  
      // Default select yearly if exists, else first plan
      const yearlyPlan = plans.find(
        (p) => p.validityPeriod === 365
      );
  
      setPlan(yearlyPlan?._id || plans[0]?._id);
    } catch (err) {
      console.error("Failed to fetch subscriptions", err);
    }
  };
  
useEffect(()=>{
  FetchSubscription();
},[])
const handleCheckout = async (planId) => {
  try {
    const res = await createCheckout({ planId });
    const url = res?.data?.url;

    if (url) {
      window.location.href = url;
    }
  } catch (err) {
    console.error("Checkout failed", err);
  }
};


  return (
    <div className=" w-full min-h-screen  text-black">
      <Header title="Subscription" />
    <div className="p-6 w-full min-h-screen text-black">
      <h1 className="text-3xl font-semibold">Current Subscription</h1>
      <p className="text-gray-600 mb-6">Manage your subscription plan</p>

      <div className="flex items-center justify-between mr-6">
        <h2 className="text-lg font-medium mb-4">Choose Your Plan</h2>
        <div className="flex items-center gap-6 mr-6">
          <button className="px-6 py-2 bg-[#5b5bf3] hover:bg-[#4a4ae0] text-white rounded-xl">Update Plan</button>
          <button className="text-[#5b5bf3]">Cancel Subscription</button>
        </div>
      </div>

    
      <div className="flex gap-6 mb-10">
  {subscriptions.map((item) => {
    const isSelected = plan === item._id;
    const isYearly = item.validityPeriod === 365;

    return (
      <PlanCard
        key={item._id}
        selected={isSelected}
        onClick={() => setPlan(item._id)}
        title={item.planTitle}
        subtitle={item.planDescription}
        oldPrice={
          isYearly
            ? `$${item.subscriptionFee * 2}/y`
            : `$${(item.subscriptionFee * 2).toFixed(2)}/mo`
        }
        newPrice={
          isYearly
            ? `$${item.subscriptionFee}/y`
            : `$${item.subscriptionFee}/mo`
        }
        onCheckout={() => handleCheckout(item._id)}
      />
    );
  })}
</div>

      {/* Features */}
      <div className="bg-white rounded-3xl shadow-md p-6 max-w-3xl">
        <h3 className="text-lg font-medium mb-4">Features</h3>
        <div className="grid grid-cols-2 gap-y-4">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between pr-6">
              <p>{item}</p>
              <Check className="text-[#5b5bf3] w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

function PlanCard({
  selected,
  onClick,
  title,
  subtitle,
  oldPrice,
  newPrice,
  onCheckout,
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-3xl w-60 border shadow-sm transition-all duration-300
        ${
          selected
            ? "bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white shadow-lg"
            : "bg-white text-black border-gray-200"
        }
      `}
    >
      <h3 className="text-xl font-semibold">{title}</h3>

      <p
        className={`text-sm mt-1 ${
          selected ? "text-gray-200" : "text-gray-500"
        }`}
      >
        {subtitle}
      </p>

      <p
        className={`mt-6 line-through text-sm ${
          selected ? "text-gray-300" : "text-gray-400"
        }`}
      >
        {oldPrice}
      </p>

      <p className="text-2xl font-bold">{newPrice}</p>

      {/* Checkout button only for selected plan */}
      {selected && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent re-select
            onCheckout();
          }}
          className="mt-6 w-full bg-white text-[#4f46e5] font-semibold py-2 rounded-xl hover:bg-gray-100"
        >
          Checkout
        </button>
      )}
    </div>
  );
}
