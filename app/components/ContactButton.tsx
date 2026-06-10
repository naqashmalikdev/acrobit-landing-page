"use client";

import { useContactModal } from "@/app/components/ContactModalContext";
import { ReactNode } from "react";

interface ContactButtonProps {
  className?: string;
  children: ReactNode;
}

export default function ContactButton({ className, children }: ContactButtonProps) {
  const { openModal } = useContactModal();
  return (
    <button type="button" onClick={openModal} className={`cursor-pointer ${className ?? ""}`}>
      {children}
    </button>
  );
}
