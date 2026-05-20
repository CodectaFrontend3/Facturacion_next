import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import AppFooter from "@/components/layout/app-footer";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  preload: false,
  fallback: []
});

export const metadata: Metadata = {
  title: "Sistema de facturacion Leonosoft",
  description: "Sistema de facturacion Leonosoft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppSidebar>
          <AppHeader />
          <main className="flex min-w-0 flex-1 flex-col h-full">
            <div className="flex-1 flex flex-col bg-white">{children}</div>
          </main>
          <AppFooter />
        </AppSidebar>
        <Toaster />
      </body>
    </html>
  );
}
