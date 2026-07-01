"use client";

import Image from "next/image";
import { Reveal, LazyVideo } from "./ScrollReveal";

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-[#f7f7f7] text-black font-sans">
      {/* Section 1: Samsung Health Ecosystem (h-screen on desktop, auto on mobile) */}
      <div className="w-full h-auto md:h-screen flex flex-col justify-start md:justify-between overflow-hidden pt-16 md:pt-24 pb-0 relative">
        {/* Top Content Row */}
        <Reveal className="w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center md:items-start text-center md:text-left z-10">
          {/* Top Left Title */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-black text-balance leading-tight md:leading-[1.2]">
            Tiết kiệm hơn với đội hình theo dõi sức khỏe tối thượng
          </h2>
          {/* Top Right Description */}
          <p className="text-black/80 text-sm md:text-base leading-relaxed text-balance md:pt-2">
            Đồng hành cùng nhau, Galaxy Ring và Galaxy Watch mang đến dữ liệu chi tiết cùng những phân tích toàn diện giúp bạn dễ dàng chinh phục mục tiêu sức khỏe của mình. Sở hữu thêm Galaxy Buds3 Pro để luôn bắt trọn nhịp điệu tập luyện.
          </p>
        </Reveal>

        {/* Bottom Image Container (Responsive h-screen fit, flush below text on mobile) */}
        <Reveal className="w-full flex-1 min-h-0 relative flex items-end justify-center mt-10 md:mt-0" delay={200}>
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] max-w-5xl">
            <Image
              src="/galaxy-ring-samsung-health-eco-system.webp"
              alt="Hệ sinh thái sức khỏe Samsung Health"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
              className="object-contain object-top md:object-bottom"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>

      {/* Section 2: Samsung Account registration (h-screen on desktop, auto on mobile) */}
      <div className="w-full h-auto md:h-screen">
        <div className="w-full h-auto md:h-full grid grid-cols-1 md:grid-cols-2 items-center max-w-6xl mx-auto">
          {/* Left Column Content (centered on mobile, left-aligned and close to image on desktop) */}
          <Reveal className="flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-md mx-auto px-6 py-12 md:py-0">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-black mb-6 text-balance leading-tight md:leading-[1.2]">
              Bắt đầu với tài khoản Samsung của bạn
            </h2>
            <p className="text-black/80 text-sm md:text-base leading-relaxed text-balance">
              Để bắt đầu sử dụng Galaxy Ring, tài khoản Samsung phải được đăng ký trên điện thoại thông minh Samsung Galaxy của bạn. Dữ liệu sức khỏe từ Galaxy Ring sẽ được chuyển và lưu trữ an toàn trong Samsung Cloud kết nối với tài khoản của bạn, giúp bạn dễ dàng truy cập và quản lý dữ liệu một cách toàn diện.
            </p>
          </Reveal>

          {/* Right Column Image Container (h-screen on desktop, responsive larger height & flush-top on mobile) */}
          <Reveal className="w-full h-[450px] sm:h-[550px] md:h-screen flex items-center justify-center p-0 mt-0" delay={200}>
            <div className="relative w-full h-full md:h-screen max-w-[350px] max-h-[620px] sm:max-w-[450px] sm:max-h-[800px] md:max-w-[600px] md:max-h-[1050px] aspect-[9/16]">
              <Image
                src="/galaxy-ring-samsung-account.webp"
                alt="Kết nối tài khoản Samsung"
                fill
                sizes="(max-width: 640px) 350px, (max-width: 768px) 450px, 600px"
                className="object-contain object-top md:object-center"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Section 3: Energy Score (min-h-screen, natural heights) */}
      <div className="w-full min-h-screen flex flex-col justify-start items-center py-16 md:py-24">
        {/* Top Text Block */}
        <Reveal className="max-w-3xl text-center mb-6 md:mb-14 px-6">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-black mb-4 md:mb-6 text-balance leading-tight md:leading-[1.2]">
            Thấu hiểu thể trạng. Làm chủ ngày dài.
          </h2>
          <p className="text-black/80 text-sm md:text-base leading-relaxed text-balance">
            Đánh giá mức độ sẵn sàng cho ngày mới của bạn với Chỉ số Năng lượng (Energy Score) từ Galaxy AI. Chỉ số được tính toán dựa trên dữ liệu giấc ngủ, nhịp tim và hoạt động ngày hôm qua của bạn. Thức dậy cùng điểm số vào mỗi buổi sáng và tự thách thức bản thân cải thiện chỉ số tốt hơn mỗi ngày.
          </p>
        </Reveal>

        {/* Middle Video Block (Full-width on mobile and desktop, lazy loaded) */}
        <div className="w-full mb-6 md:mb-14 overflow-hidden">
          <LazyVideo
            src="/galaxy-ring-energy-score-video-pc"
            className="w-full overflow-hidden"
          />
        </div>

        {/* Bottom Image Block (Responsive centered on mobile, 70% width on desktop) */}
        <Reveal className="w-full max-w-xl md:max-w-[70%] px-6 md:px-0 mx-auto" delay={300}>
          <img
            src="/galaxy-ring-energy-score.webp"
            alt="Báo cáo chỉ số năng lượng Energy Score"
            className="w-full h-auto object-contain block mx-auto hover:scale-[1.02] transition duration-300"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
