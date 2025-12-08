"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getContactsById } from "../../services/APIs/Contact";
import { toast } from "react-toastify";

export default function EditContact() {
  const router = useRouter();
  const pathname = usePathname();
  const contactId = pathname.split("/").pop();

  const [form, setForm] = useState({
    firstName: "NA",
    lastName: "NA",
    email: "NA",
    company: "NA",
    jobTitle: "NA",
    cellPhone: "NA",
    country: "NA",
    streetAddress: "NA",
    streetAddress2: "NA",
    city: "NA",
    state: "NA",
    zipCode: "NA",
    birthday: "NA",
    notes: "NA",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (contactId) fetchContact();
  }, [contactId]);

  const fetchContact = async () => {
    
    try {
        setLoading(true);
      const res = await getContactsById(contactId);
      if (res.status ) {
        const data = res.data;
        setForm({
          firstName: data.firstName || "NA",
          lastName: data.lastName || "NA",
          email: data.email || "NA",
          company: data.company || "NA",
          jobTitle: data.jobTitle || "NA",
          cellPhone: data.cellPhone || "NA",
          country: data.country || "NA",
          streetAddress: data.streetAddress || "NA",
          streetAddress2: data.streetAddress2 || "NA",
          city: data.city || "NA",
          state: data.state || "NA",
          zipCode: data.zipCode || "NA",
          birthday: data.birthday || "NA",
          notes: data.notes || "NA",
        });
      } else {
        toast.error("Contact not found");
      }
    } catch (error) {
      toast.error("Failed to fetch contact");
    }finally {
        setLoading(false);
      }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  if (loading) {
    return (
        <div className="text-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a4bda] mx-auto mb-4"></div>
        <p className="text-xl font-medium text-[#4a4bda] capitalize">
            Loading ...
        </p>
    </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 flex flex-col sm:flex-row gap-4 justify-between">
      <div className="bg-white max-w-2xl rounded-2xl shadow-xl p-8 w-full">
        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900">
          Contact Details
        </h1>
        <p className="text-sm text-gray-500 mb-4">View contact information</p>

        <hr className="mb-6 text-[#E1E1E1]" />

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="First name" name="firstName" value={form.firstName} onChange={handleChange} />
          <Input label="Last name" name="lastName" value={form.lastName} onChange={handleChange} />
          <Input label="Company" name="company" value={form.company} onChange={handleChange} />
          <Input label="Job title" name="jobTitle" value={form.jobTitle} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Cell phone" name="cellPhone" value={form.cellPhone} onChange={handleChange} />
          <Input label="Country / Region" name="country" value={form.country} onChange={handleChange} />
          <Input label="Street address" name="streetAddress" value={form.streetAddress} onChange={handleChange} />
          <Input label="Street address line 2" name="streetAddress2" value={form.streetAddress2} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" name="city" value={form.city} onChange={handleChange} />
            <Input label="State" name="state" value={form.state} onChange={handleChange} />
          </div>
          <Input label="Zip code" name="zipCode" value={form.zipCode} onChange={handleChange} />
          <Input label="Birthday" name="birthday" value={form.birthday} onChange={handleChange} />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
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
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-[#E1E1E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#FAFAFA]"
      />
    </div>
  );
}
