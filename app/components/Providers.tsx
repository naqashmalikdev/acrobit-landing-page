"use client";

import { ContactModalProvider } from "@/app/components/ContactModalContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <ContactModalProvider>{children}</ContactModalProvider>;
}
