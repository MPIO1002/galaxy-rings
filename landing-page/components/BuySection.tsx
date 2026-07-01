"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useBuyConfiguration } from "@/hooks/useBuyConfiguration";
import { useOrder } from "@/hooks/useOrder";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { CAROUSEL_IMAGES, COLORS, SIZES, PRODUCTS } from "@/constants/buyData";
import CarouselSkeleton from "@/components/skeletons/CarouselSkeleton";
import BuyConfigSkeleton from "@/components/skeletons/BuyConfigSkeleton";

export default function BuySection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate API loading delay
    return () => clearTimeout(timer);
  }, []);

  const {
    activeImageIndex,
    setActiveImageIndex,
    selectedColor,
    selectedSize,
    setSelectedSize,
    showVideoPopup,
    setShowVideoPopup,
    showOrderModal,
    setShowOrderModal,
    handleColorSelect,
    nextSlide,
    prevSlide,
    handleBuy
  } = useBuyConfiguration(CAROUSEL_IMAGES.length);

  const { showToast, dismissToast, toasts } = useToast();

  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    reset,
  } = useOrder({
    onSuccess: () =>
      showToast("Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất.", "success"),
    onError: (msg) => showToast(msg, "error"),
  });

  const selectedColorObj = COLORS.find((c) => c.id === selectedColor);
  const product = PRODUCTS[0];

  const onSubmitOrder = () => {
    if (!selectedSize) {
      showToast("Vui lòng chọn size nhẫn trước khi đặt hàng.", "warning");
      return;
    }
    handleSubmit(product.id, selectedColor, selectedSize);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    if (isSuccess) {
      reset();
    }
  };

  return (
    <section id="buy" className="w-full bg-white text-black py-16 md:py-24 font-sans relative z-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 lg:items-stretch items-start">

        {/* Left Column: Image Carousel */}
        {isLoading ? (
          <CarouselSkeleton />
        ) : (
          <div className="w-full flex flex-col items-center justify-between lg:h-full">
            {/* Main Display Container */}
            <div className="relative w-full aspect-square lg:aspect-auto lg:flex-1 max-w-[500px] rounded-2xl overflow-hidden shadow-sm group">
              {/* Slider track */}
              <div
                className="flex w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
              >
                {CAROUSEL_IMAGES.map((img, idx) => (
                  <div key={idx} className="relative w-full h-full flex-shrink-0">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-zinc-200 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm active:scale-95 cursor-pointer"
                aria-label="Ảnh trước"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-zinc-200 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm active:scale-95 cursor-pointer"
                aria-label="Ảnh tiếp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2.5 mt-6">
              {CAROUSEL_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${activeImageIndex === idx ? "bg-black w-6" : "bg-zinc-300 hover:bg-zinc-400"
                    }`}
                  aria-label={`Đi tới ảnh ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Right Column: Configuration */}
        {isLoading ? (
          <BuyConfigSkeleton />
        ) : (
          <div className="w-full flex flex-col justify-center">
            {/* Header Specs */}
            <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-1">
              Đặt hàng ngay
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-3 leading-tight md:leading-[1.2]">
              Galaxy Ring
            </h2>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-extrabold text-black">
                {product.basePrice.toLocaleString("vi-VN")}₫
              </span>
              <span className="text-zinc-400 line-through text-sm md:text-base">
                {product.originalPrice.toLocaleString("vi-VN")}₫
              </span>
            </div>

            <p className="text-zinc-600 text-sm md:text-base mb-8 leading-relaxed">
              Hỗ trợ trả góp 0% chỉ từ 416.250₫/tháng. Miễn phí vận chuyển toàn quốc. Bảo hành chính hãng 12 tháng tại các trung tâm ủy quyền Samsung.
            </p>

            <hr className="border-zinc-100 mb-8" />

            {/* Colors Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">
                1. Chọn màu sắc
              </h3>
              <div className="flex gap-4">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorSelect(color.id, color.carouselIndex)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer w-28 ${selectedColor === color.id
                      ? "border-black bg-zinc-50 scale-102"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                      }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-semibold text-zinc-700">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Guide Box */}
            <div className="mb-8 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-extrabold text-black">
                  Bạn chưa biết size nhẫn của mình?
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Nhận Bộ dụng cụ đo size miễn phí khi mua hàng, hoặc xem video hướng dẫn.
                </p>
              </div>
              <button
                onClick={() => setShowVideoPopup(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                Xem hướng dẫn đo size
              </button>
            </div>

            {/* Sizes Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">
                2. Chọn kích cỡ (Size)
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 rounded-xl border font-bold text-sm transition-all duration-300 cursor-pointer ${selectedSize === size
                      ? "bg-black text-white border-black scale-105 shadow-sm"
                      : "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buy Button */}
            <button
              onClick={handleBuy}
              className="w-full py-4 md:py-5 rounded-full bg-black text-white hover:bg-zinc-900 transition-all duration-300 font-bold text-sm md:text-base tracking-wider hover:scale-[1.01] active:scale-99 shadow-lg shadow-black/10 cursor-pointer"
            >
              Mua ngay
            </button>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-opacity duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl animate-[modalSlideUp_0.35s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-zinc-950 text-white px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Xác nhận đơn hàng</p>
                  <h3 className="text-xl font-black tracking-tight">Galaxy Ring</h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition active:scale-95"
                  aria-label="Đóng"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Order Summary */}
              <div className="flex items-center gap-4 mt-4 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div
                  className="w-10 h-10 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                  style={{ backgroundColor: selectedColorObj?.hex ?? "#232426" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{selectedColorObj?.name ?? "Đen Titanium"} · Size {selectedSize ?? "—"}</p>
                  <p className="text-xs text-zinc-400">Samsung Galaxy Ring Titanium</p>
                </div>
                <span className="text-sm font-extrabold text-white whitespace-nowrap">
                  {product.basePrice.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">
              {isSuccess ? (
                /* Success State */
                <div className="flex flex-col items-center text-center py-6 animate-[fadeIn_0.4s_ease-out]">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-500 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Đặt hàng thành công!
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    Cảm ơn bạn đã đặt mua Galaxy Ring. Chúng tôi sẽ liên hệ xác nhận đơn hàng qua điện thoại trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3.5 rounded-xl bg-black text-white font-bold text-sm hover:bg-zinc-900 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    Đóng
                  </button>
                </div>
              ) : (
                /* Order Form */
                <div className="space-y-5">
                  <p className="text-xs text-zinc-400 font-medium">
                    Vui lòng điền thông tin để hoàn tất đặt hàng. Tất cả trường đều bắt buộc.
                  </p>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="order-fullName" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="order-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 border text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.fullName
                          ? "border-red-400 focus:ring-red-400/20"
                          : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="order-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Địa chỉ Email
                    </label>
                    <input
                      type="email"
                      id="order-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 border text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.email
                          ? "border-red-400 focus:ring-red-400/20"
                          : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="order-phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="order-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0912345678"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 border text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.phone
                          ? "border-red-400 focus:ring-red-400/20"
                          : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="order-address" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Địa chỉ giao hàng
                    </label>
                    <input
                      type="text"
                      id="order-address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 border text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.address
                          ? "border-red-400 focus:ring-red-400/20"
                          : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={onSubmitOrder}
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 select-none shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? "bg-zinc-300 text-zinc-500 cursor-not-allowed shadow-none"
                        : "bg-black text-white hover:bg-zinc-900 active:scale-[0.99] hover:scale-[1.01] shadow-black/10"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      "Xác nhận đặt hàng"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Popup Modal */}
      {showVideoPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-opacity duration-300"
          onClick={() => setShowVideoPopup(false)}
        >
          {/* Modal content */}
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/5Mja4EXJWOo?autoplay=1"
              title="Hướng dẫn chọn size Galaxy Ring"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Close button */}
            <button
              onClick={() => setShowVideoPopup(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black border border-white/20 hover:border-white/50 text-white flex items-center justify-center cursor-pointer transition active:scale-95"
              aria-label="Đóng popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </section>
  );
}
