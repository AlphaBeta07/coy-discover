import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coy – Discover",
  description: "Find out if your crush likes you back. If they don't, nobody ever knows.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="min-h-screen bg-[#F0EDF6] flex justify-center selection:bg-coy-pink selection:text-white">
        {/* Mobile-first centered shell conforming to Coy app specifications */}
        <div className="w-full max-w-[480px] min-h-[100dvh] bg-white border-x-2 border-coy-line/80 shadow-[0_0_50px_rgba(21,18,29,0.06)] flex flex-col relative overflow-x-hidden">
          <Navbar />
          <main className="flex-1 flex flex-col relative px-4 pt-4 pb-2">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
