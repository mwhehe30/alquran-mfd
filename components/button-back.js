"use client";

import { ArrowLeft } from "lucide-react";

const ButtonBack = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-[#17382f] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
      aria-label="Kembali ke halaman sebelumnya"
    >
      <ArrowLeft className="size-5" />
    </button>
  );
};

export default ButtonBack;
