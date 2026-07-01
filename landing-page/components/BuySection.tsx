"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useBuyConfiguration } from "@/hooks/useBuyConfiguration";
import { CAROUSEL_IMAGES, COLORS, SIZES } from "@/constants/buyData";
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
    handleColorSelect,
    nextSlide,
    prevSlide,
    handleBuy
  } = useBuyConfiguration(CAROUSEL_IMAGES.length);

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
                9.990.000₫
              </span>
              <span className="text-zinc-400 line-through text-sm md:text-base">
                10.990.000₫
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
              onClick={() => handleBuy(COLORS.find(c => c.id === selectedColor)?.name || "")}
              className="w-full py-4 md:py-5 rounded-full bg-black text-white hover:bg-zinc-900 transition-all duration-300 font-bold text-sm md:text-base tracking-wider hover:scale-[1.01] active:scale-99 shadow-lg shadow-black/10 cursor-pointer"
            >
              Mua ngay
            </button>
          </div>
        )}
      </div>

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
    </section>
  );
}
