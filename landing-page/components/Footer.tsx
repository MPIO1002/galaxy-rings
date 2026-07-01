"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-zinc-900 text-zinc-400 py-16 md:py-20 font-sans relative z-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
        {/* Column 1: Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black tracking-[0.2em] text-white">
              SAMSUNG
            </span>
            <span className="text-xs text-zinc-400 font-medium tracking-wide">
              Galaxy Ring
            </span>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
            Kỷ nguyên mới của công nghệ chăm sóc sức khỏe thông minh. Theo dõi toàn diện thể trạng, giấc ngủ và năng lượng của bạn 24/7 chỉ với một chiếc nhẫn thời thượng.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Sản phẩm
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#features" className="hover:text-white transition duration-200">
                Tính năng nổi bật
              </a>
            </li>
            <li>
              <a href="#buy" className="hover:text-white transition duration-200">
                Đặt mua Galaxy Ring
              </a>
            </li>
            <li>
              <a href="#subscribe" className="hover:text-white transition duration-200">
                Đăng ký nhận tin tức
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Support & Legal */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Hỗ trợ &amp; Điều khoản
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                Trung tâm bảo hành
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                Điều khoản sử dụng
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom (Copyright and social links) */}
      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-zinc-600 text-center md:text-left">
          &copy; {currentYear} Công ty Điện tử Samsung Vina. Bảo lưu mọi quyền.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5 text-zinc-600">
          <a href="#" className="hover:text-white transition" aria-label="Facebook">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="#" className="hover:text-white transition" aria-label="YouTube">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816-.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/>
            </svg>
          </a>
          <a href="#" className="hover:text-white transition" aria-label="Instagram">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
