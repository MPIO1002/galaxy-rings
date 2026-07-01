import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Chatbot from "@/components/Chatbot";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Galaxy Ring Thế Hệ Mới - Trợ Lý Sức Khỏe AI Toàn Diện | Samsung 2026",
  description: "Khám phá Galaxy Ring - chiếc nhẫn thông minh đột phá với cảm biến sinh học tân tiến và trợ lý AI. Theo dõi giấc ngủ, nhịp tim và chỉ số năng lượng Energy Score chuẩn xác suốt 24/7.",
  keywords: ["Galaxy Ring", "nhẫn thông minh", "Samsung Galaxy Ring 2026", "thiết bị theo dõi sức khỏe", "smart ring", "Energy Score AI"],
  authors: [{ name: "Samsung Vietnam" }],

  openGraph: {
    title: "Galaxy Ring Thế Hệ Mới - Trợ Lý Sức Khỏe AI Toàn Diện",
    description: "Thiết kế titan thời thượng, pin bền bỉ cả tuần, theo dõi sức khỏe thông minh cùng Galaxy AI. Đăng ký trải nghiệm sớm ngay hôm nay!",
    url: "https://galaxy-rings.vercel.app/",
    siteName: "Samsung Galaxy Ring Ecosystem",
    images: [
      {
        url: "/all-rings.webp",
        width: 1200,
        height: 630,
        alt: "Samsung Galaxy Ring Banner",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Galaxy Ring - Trợ Lý Sức Khỏe AI Toàn Diện",
    description: "Theo dõi giấc ngủ, nhịp tim và năng lượng cơ thể 24/7 với Galaxy Ring thế hệ mới.",
    images: ["/og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn(montserrat.variable, "font-sans", geist.variable)}
    >
      <body className="font-sans min-h-full flex flex-col">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}