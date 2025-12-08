"use client";

import EditContact from "../../../../components/Contacts/Edit";
import { Header } from "../../../../components/Header";

export default function CalendarPage() {
  return (
    <div>
        <Header title="Contacts" />
    <EditContact/>
    </div>
  );
}
