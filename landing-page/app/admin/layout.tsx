import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Galaxy Ring",
  description: "Trang quản trị hệ thống Galaxy Ring - Quản lí đơn hàng và đăng ký nhận tin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
