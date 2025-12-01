"use client";
import { useState } from "react";
import { Header } from "../../../../components/Header";


export default function PaymentMethods() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className=" w-full min-h-screen bg-[#FCFDFF] text-black">
      <Header title="Payment Method" />
    <div className="p-6">
      <h1 className="text-xl font-semibold">Payment Methods</h1>
      <p className="text-sm text-gray-500">
        Manage your preferred payment options for a seamless experience.
      </p>

      <div className="mt-4 bg-white p-4 rounded-xl shadow-sm flex justify-between items-center w-[350px]">

        <div>
          <p className="font-medium">•••• •••• •••• 2325</p>
          <p className="text-xs text-gray-400">Chase Bank • Credit Card</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="text-indigo-600 hover:underline"
        >
          Update Card
        </button>
      </div>

      {/* Modal */}
      <UpdateCardModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
    </div>
  );
}

function UpdateCardModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] rounded-2xl p-6 shadow-xl animate-scaleIn">

        {/* Header */}
        <h2 className="text-xl font-semibold">Add Card Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your card details
        </p>

        {/* Form */}
        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">Card Holder Name</label>
            <input
              type="text"
              placeholder="John"
              className="w-full mt-1 bg-gray-100 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Card Number</label>
            <input
              type="text"
              placeholder="1234-1234-1234-1234"
              className="w-full mt-1 bg-gray-100 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Expiry Month</label>
              <input
                type="text"
                placeholder="Month"
                className="w-full mt-1 bg-gray-100 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium">Expiry Year</label>
              <input
                type="text"
                placeholder="Year"
                className="w-full mt-1 bg-gray-100 rounded-lg px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-medium">CVV</label>
            <input
              type="password"
              placeholder="***"
              className="w-full mt-1 bg-gray-100 rounded-lg px-3 py-2 outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
          >
            Cancel
          </button>

          <button className="px-5 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">
            Save and Update
          </button>
        </div>
      </div>
    </div>
  );
}
