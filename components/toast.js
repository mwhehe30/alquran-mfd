"use client";

import { Check } from "lucide-react";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-28 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-[#17382f] px-4 py-3 text-sm font-semibold text-white shadow-2xl">
      <Check className="size-4 text-[#e6c775]" />
      {message}
    </div>
  );
}
