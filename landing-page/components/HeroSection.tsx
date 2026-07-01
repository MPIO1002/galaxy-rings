"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <section className="relative w-full h-screen bg-black text-white flex flex-col items-center justify-between overflow-hidden pt-12 md:pt-20 pb-0">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[50%] translate-x-[-50%] w-[80%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      
      {/* Content wrapper */}
      <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col items-center text-center">
        {/* Brand label */}
        <div className="opacity-0 text-xs md:text-sm font-black tracking-[0.4em] text-white uppercase mb-2 md:mb-3 animate-fade-in">
          Galaxy Ring
        </div>

        {/* Main Title with SVG Icon inline */}
        <h1 className="opacity-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 md:mb-6 animate-fade-in-up animation-delay-200">
          <span>Galaxy AI</span>
          <span className="inline-flex items-center align-middle justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 relative">
            <Image
              src="/galaxy-ring-icon-ai.svg"
              alt="Galaxy AI Icon"
              fill
              sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 64px"
              className="object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-pulse"
              priority
            />
          </span>
          <span>đã có mặt</span>
        </h1>

        {/* Description Text */}
        <p className="opacity-0 max-w-2xl text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 animate-fade-in-up animation-delay-400 text-balance">
          Theo dõi sức khỏe trên ngón tay thoải mái hơn bao giờ hết với hai lựa chọn kích cỡ mới. Tìm kích thước vừa vặn cùng ưu đãi thu cũ đổi mới nhận ngay trợ giá $150 để hoàn thiện đội hình tập luyện tối thượng <span className="inline-block">của bạn.</span>
        </p>

        {/* CTA Buttons */}
        <div className="opacity-0 flex flex-row items-center justify-center gap-3 mb-6 md:mb-8 w-full max-w-xs sm:max-w-none sm:w-auto animate-fade-in-up animation-delay-600">
          <a
            href="#buy"
            className="flex-1 sm:flex-none text-center px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-300 hover:bg-zinc-100 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Mua ngay
          </a>
          <a
            href="#learn"
            className="flex-1 sm:flex-none text-center px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full border border-zinc-700 hover:border-white text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </div>

      {/* Video Section - Placed at the bottom (Full Width & responsive height to fit h-screen) */}
      <div className="opacity-0 w-full relative z-10 animate-fade-in-up animation-delay-600 flex-1 min-h-0 flex items-end">
        <div className="relative w-full h-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-top block"
            autoPlay
            muted
            playsInline
            src="/hero-video.webm"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
          {/* Gradients to fade video into the background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none" />
          
          {/* Play / Replay Floating Control Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/50 backdrop-blur-md text-white transition-all duration-300 active:scale-90 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            aria-label={isPlaying ? "Tạm dừng video" : "Phát lại video"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
