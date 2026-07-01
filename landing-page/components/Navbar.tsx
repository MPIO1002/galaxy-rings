"use client";

import { useNavbar } from "@/hooks/useNavbar";
import { NAV_LINKS } from "@/constants/navigationData";

export default function Navbar() {
  const { isOpen, setIsOpen, isScrolled, handleScrollToSection } = useNavbar();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 font-sans ${isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-zinc-800/50 py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleScrollToSection(e, "#")}
          className="flex items-baseline gap-2 group"
        >
          <span className="text-lg md:text-xl font-black tracking-[0.2em] text-white">
            SAMSUNG
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="#buy"
            onClick={(e) => handleScrollToSection(e, "#buy")}
            className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 font-bold text-xs tracking-wider uppercase shadow-md active:scale-95"
          >
            Mua ngay
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-zinc-300 transition focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-zinc-800/80 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[300px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
          }`}
      >
        <div className="flex flex-col items-center gap-5 px-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setIsOpen(false);
                handleScrollToSection(e, link.href);
              }}
              className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#buy"
            onClick={(e) => {
              setIsOpen(false);
              handleScrollToSection(e, "#buy");
            }}
            className="w-full text-center py-3 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase shadow-md active:scale-95"
          >
            Mua ngay
          </a>
        </div>
      </div>
    </nav>
  );
}
