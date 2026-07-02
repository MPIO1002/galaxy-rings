"use client";

import React from "react";
import { Reveal } from "./ScrollReveal";
import { useSubscribe } from "../hooks/useSubscribe";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "./Toast";
import { track } from "@vercel/analytics";

export default function SubscribeSection() {
  const { showToast, dismissToast, toasts } = useToast();

  const { register, errors, isSubmitting, isSuccess, handleSubmit, reset } =
    useSubscribe({
      onSuccess: () =>
        showToast("Đăng ký thành công! Chúng tôi sẽ liên hệ sớm nhất.", "success"),
      onError: (msg) => showToast(msg, "error"),
    });

  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <section id="subscribe" className="w-full bg-[#0a0a0c] text-white py-20 md:py-28 relative overflow-hidden font-sans">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
      >
        <source src="/galaxy-ring-concave-pc.webm" type="video/webm" />
        <source src="/galaxy-ring-concave-pc.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

      {/* Decorative cosmic background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-zinc-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Header Content */}
        <Reveal className="text-center max-w-2xl mb-12">
          <span className="text-zinc-400 text-xs md:text-sm font-black tracking-widest uppercase mb-3 block">
            Trải nghiệm tương lai
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 text-balance leading-tight md:leading-[1.2]">
            Đăng ký nhận tin tức &amp; Ưu đãi sớm
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-balance">
            Để lại thông tin để là người đầu tiên nhận thông báo mở bán, các chương trình khuyến mãi độc quyền và cẩm nang sử dụng Galaxy Ring từ Samsung.
          </p>
        </Reveal>

        {/* Form Container */}
        <Reveal className="w-full max-w-lg" delay={150}>
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl relative">
            {isSuccess ? (
              <div className="flex flex-col items-center text-center py-6 animate-fade-in">
                {/* Glowing Green Success Checkmark */}
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  Đăng ký thành công!
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Cảm ơn bạn đã quan tâm đến Galaxy Ring. Chúng tôi đã ghi nhận thông tin và sẽ gửi cập nhật sớm nhất đến bạn qua Email và SMS.
                </p>
                <button
                  onClick={reset}
                  className="mt-8 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition uppercase tracking-wider cursor-pointer"
                >
                  Đăng ký tài khoản khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fullname Field */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Nguyễn Văn A"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-950/60 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.fullName
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600/20"
                    }`}
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-950/60 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600/20"
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="0912345678"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-950/60 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600/20"
                    }`}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={() => track("click_subscribe_submit")}
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 select-none shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-zinc-800 text-zinc-400 cursor-not-allowed shadow-none"
                      : "bg-white text-black hover:bg-zinc-200 active:scale-[0.99] hover:scale-[1.01] shadow-white/5"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    "Đăng ký ngay"
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </section>
  );
}
