import { AlertTriangle, RefreshCw } from "lucide-react";

export const CardSkeleton = ({ count = 5 }) => (
  <div className="space-y-3" aria-label="Memuat data">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-[24px] border border-[#17382f]/8 bg-white/70 p-5"
      >
        <div className="mb-4 h-4 w-2/5 rounded bg-[#dbe9e3]" />
        <div className="h-16 rounded-[18px] bg-[#edf4f0]" />
      </div>
    ))}
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="rounded-[26px] border border-red-200 bg-white/75 px-6 py-10 text-center shadow-[0_8px_26px_rgba(23,56,47,.05)]">
    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-50">
      <AlertTriangle className="size-6 text-red-500" />
    </div>
    <h2 className="font-bold text-[#17382f]">Data belum dapat dimuat</h2>
    <p className="mt-2 text-sm leading-6 text-[#718078]">{message}</p>
    <button
      onClick={onRetry}
      className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#0f6b56] px-5 py-3 text-sm font-bold text-white"
    >
      <RefreshCw className="size-4" />
      Coba lagi
    </button>
  </div>
);
