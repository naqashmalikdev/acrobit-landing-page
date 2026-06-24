"use client";

import { ContactModalProvider } from "@/app/components/ContactModalContext";
import AcrobitChat from "@/app/components/AcrobitChat";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ContactModalProvider>
      {children}
      <AcrobitChat />
    </ContactModalProvider>
  );
}
