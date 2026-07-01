"use client";

import React, { useEffect, useRef } from "react";
import { Toast as ToastType, ToastVariant } from "../hooks/useToast";

// ─── Variant config ───────────────────────────────────────────────────────────
const variantConfig: Record<
  ToastVariant,
  {
    containerClass: string;
    iconBg: string;
    progressClass: string;
    icon: React.ReactNode;
    label: string;
  }
> = {
  success: {
    containerClass:
      "bg-zinc-900/95 border-emerald-500/40 shadow-[0_0_24px_rgba(16,185,129,0.08)]",
    iconBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
    progressClass: "bg-emerald-500",
    label: "Thành công",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  error: {
    containerClass:
      "bg-zinc-900/95 border-red-500/40 shadow-[0_0_24px_rgba(239,68,68,0.08)]",
    iconBg: "bg-red-500/10 border-red-500/25 text-red-400",
    progressClass: "bg-red-500",
    label: "Lỗi",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  },
  warning: {
    containerClass:
      "bg-zinc-900/95 border-amber-500/40 shadow-[0_0_24px_rgba(245,158,11,0.08)]",
    iconBg: "bg-amber-500/10 border-amber-500/25 text-amber-400",
    progressClass: "bg-amber-500",
    label: "Cảnh báo",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  info: {
    containerClass:
      "bg-zinc-900/95 border-blue-500/40 shadow-[0_0_24px_rgba(59,130,246,0.08)]",
    iconBg: "bg-blue-500/10 border-blue-500/25 text-blue-400",
    progressClass: "bg-blue-500",
    label: "Thông tin",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
};

// ─── Single Toast item ────────────────────────────────────────────────────────
interface ToastItemProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
  duration?: number;
}

function ToastItem({ toast, onDismiss, duration = 4500 }: ToastItemProps) {
  const config = variantConfig[toast.variant];
  const progressRef = useRef<HTMLDivElement>(null);

  // Animate the progress bar from 100% → 0% over `duration`ms
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    el.style.transition = `width ${duration}ms linear`;
    // Start at 100 and schedule to 0 on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.width = "0%";
      });
    });
  }, [duration]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        relative flex items-start gap-3 w-full max-w-sm
        border rounded-2xl px-4 py-3.5 backdrop-blur-xl
        overflow-hidden select-none
        ${config.containerClass}
        ${toast.exiting ? "toast-exit" : "toast-enter"}
      `}
    >
      {/* Icon */}
      <div className={`shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center ${config.iconBg}`}>
        {config.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
          {config.label}
        </p>
        <p className="text-sm text-zinc-200 leading-snug break-words">
          {toast.message}
        </p>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Đóng thông báo"
        className="shrink-0 mt-0.5 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          className="w-4 h-4">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full ${config.progressClass}`}
        style={{ transition: "none" }}
      />
    </div>
  );
}

// ─── Toast Container ──────────────────────────────────────────────────────────
interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
  duration?: number;
}

/**
 * Fixed bottom-right toast container. Drop this into your root layout or page.
 */
export function ToastContainer({ toasts, onDismiss, duration }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Thông báo"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <ToastItem toast={toast} onDismiss={onDismiss} duration={duration} />
        </div>
      ))}
    </div>
  );
}
