"use client";

interface VideoPopupModalProps {
  onClose: () => void;
}

export default function VideoPopupModal({ onClose }: VideoPopupModalProps) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-opacity duration-300"
      onClick={onClose}
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
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black border border-white/20 hover:border-white/50 text-white flex items-center justify-center cursor-pointer transition active:scale-95"
          aria-label="Đóng popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
