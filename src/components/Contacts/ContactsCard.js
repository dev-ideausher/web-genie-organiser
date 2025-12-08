"use client";

import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getContactsAPI } from "../../services/APIs/Contact";
import { toast } from "react-toastify";

export default function ContactsCard() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await getContactsAPI();
      if (res.status) {
        setContacts(res.data.results);
      } else {
        toast.error("Failed to fetch contacts");
      }
    } catch (error) {
      toast.error("Error fetching contacts");
    } finally {
      setLoading(false);
    }
  };


  const filteredContacts = contacts.filter(
    (c) =>
      c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10">
      {/* Contacts Card */}
      <div className="flex flex-col sm:flex-row flex-col-reverse sm:justify-between gap-4">
        <div className="bg-white max-w-xl rounded-2xl shadow-lg p-6 w-full">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Contacts
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {contacts.length} Contacts added.
          </p>

          <hr className="mb-4" />

          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Contacts List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center mt-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a4bda] mx-auto mb-4"></div>
              <p className="text-xl font-medium text-[#4a4bda] capitalize">
                  Loading ...
              </p>
          </div>
            ) : filteredContacts.length === 0 ? (
              <p className="text-gray-500">No contacts found.</p>
            ) : (
              filteredContacts.map((contact) => (
                <div key={contact._id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-semibold">
                        {contact.firstName.charAt(0)}
                      </div>

                      {/* Info */}
                      <div>
                        <p className="font-medium text-gray-900">
                          {contact.firstName} {contact.lastName || ""}
                        </p>
                        <p className="text-sm text-gray-500">
                          {contact.cellPhone || "-"} | {contact.email || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 text-gray-500">
                      <Pencil
                        className="cursor-pointer hover:text-indigo-600"
                        size={18}
                        onClick={() => router.push(`/contacts/${contact._id}`)}
                      />
                      <Trash2
                        className="cursor-pointer hover:text-red-500"
                        size={18}
                        onClick={() => toast.info("Delete functionality not implemented")}
                      />
                    </div>
                  </div>

                  <hr className="mt-4 border-dashed" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end mb-6 h-12">
          <button
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full shadow"
            onClick={() => router.push("/contacts/create")}
          >
            <Plus size={18} />
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
}
