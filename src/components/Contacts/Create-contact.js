"use client";

import { Plus } from "lucide-react";
import { createContact } from "../../services/APIs/Contact";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateContact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    cellPhone: "",
    country: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    zipCode: "",
    birthday: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.firstName) {
      toast.error("First name is required");
      return;
    }

    const payload = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== "")
    );

    try {
      await createContact(payload);
      toast.success("Contact created successfully");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        jobTitle: "",
        cellPhone: "",
        country: "",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        state: "",
        zipCode: "",
        birthday: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to create contact");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 flex flex-col sm:flex-row gap-4 justify-between">
      <div className="bg-white max-w-2xl rounded-2xl shadow-xl p-8">
        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900">
          Create a new Contact.
        </h1>
        <p className="text-sm text-gray-500 mb-4">Stay connected with ease.</p>

        <hr className="mb-6 text-[#E1E1E1]" />

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="First name"
            placeholder="Enter name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />

          <Input
            label="Last name"
            placeholder="Enter last name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          <Input
            label="Company"
            placeholder="Enter company"
            name="company"
            value={form.company}
            onChange={handleChange}
          />

          <Input
            label="Job title"
            placeholder="Enter job title"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
          />

          <Input
            label="Email"
            placeholder="Enter email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Cell phone"
            placeholder="Enter cell phone"
            name="cellPhone"
            value={form.cellPhone}
            onChange={handleChange}
          />

          <Input
            label="Country / Region"
            placeholder="Enter country"
            name="country"
            value={form.country}
            onChange={handleChange}
          />

          <Input
            label="Street address"
            placeholder="Enter address"
            name="streetAddress"
            value={form.streetAddress}
            onChange={handleChange}
          />

          <Input
            label="Street address line 2"
            placeholder="Enter address"
            name="streetAddress2"
            value={form.streetAddress2}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="Enter city"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
            <Input
              label="State"
              placeholder="Enter state"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Zip code"
            placeholder="Enter zip code"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
          />

          <Input
            label="Birthday"
            placeholder="Enter birthday"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Enter notes"
              className="bg-[#FAFAFA] w-full h-28 px-4 py-3 border border-[#E1E1E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </form>
      </div>

      <div className="flex justify-end mb-6 h-12">
        <button
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full shadow"
          onClick={handleSubmit}
        >
          <Plus size={18} />
          Add Contact
        </button>
      </div>
    </div>
  );
}

/*  Reusable Input Component */
function Input({ label, placeholder, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-[#E1E1E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#FAFAFA]"
      />
    </div>
  );
}
