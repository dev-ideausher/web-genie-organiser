"use client";

import CreateContact from "../../../../components/Contacts/Create-contact";
import { Header } from "../../../../components/Header";

export default function CalendarPage() {
  return (
    <div>
        <Header title="Contacts" />
    <CreateContact/>
    </div>
  );
}
