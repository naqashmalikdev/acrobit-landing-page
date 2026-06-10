"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "@/app/components/ContactModal";

interface ContactModalContextValue {
  openModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue>({ openModal: () => {} });

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ContactModalContext.Provider value={{ openModal: () => setOpen(true) }}>
      {children}
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </ContactModalContext.Provider>
  );
}
