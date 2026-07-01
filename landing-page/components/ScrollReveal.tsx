"use client";

import { useEffect, useRef, useState } from "react";

// Premium Scroll-Reveal Storytelling Animation component
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"
        } ${className}`}
    >
      {children}
    </div>
  );
}

// Lazy Video Component - Renders video directly to ensure iOS native autoplay works
export function LazyVideo({ src, className = "" }: { src: string; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false); // quyết định có mount <video> hay chưa
  const [isPlaying, setIsPlaying] = useState(false);

  // Bước 1: phát hiện khi nào wrapper (KHÔNG transform) đi vào viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true); // mount video lần đầu
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Bước 2: một khi video đã mount, đảm bảo play() được gọi sau khi đã "ổn định" (không còn transform nào chạy)
  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    const video = videoRef.current;
    // Delay nhỏ để chắc chắn không trùng với bất kỳ transition nào ở DOM cha
    const t = setTimeout(() => {
      video.play().catch(() => { });
    }, 50);
    return () => clearTimeout(t);
  }, [shouldLoad]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
  };

  return (
    // Wrapper này chỉ dùng opacity, KHÔNG dùng transform/scale, để không phá compositing layer của video
    <div
      ref={wrapperRef}
      className={`${className} bg-[#f7f7f7] relative min-h-[150px] flex items-center justify-center transition-opacity duration-700 ${shouldLoad ? "opacity-100" : "opacity-0"
        }`}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          className="w-full h-auto block"
          autoPlay
          muted
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={`${src}.webm`} type="video/webm" />
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>
      )}
      <button
        onClick={togglePlay}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 hover:border-white/50 text-white transition-all duration-300 active:scale-90 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
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
  );
}