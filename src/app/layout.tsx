import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de facturación LeonoSoft",
  description: "Sistema de facturación electrónica",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      {/* Todo el diseño de Tailwind Base */}
      {/* AÑADIMOS suppressHydrationWarning AQUÍ 👇 */}
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-white text-gray-800">
        {children}
        <Toaster />
      </body>
    </html>
  );
}