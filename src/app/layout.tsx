import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
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
      <body className="min-h-full flex flex-col font-sans">
        <AppSidebar>
          <main className="flex min-w-0 flex-1 flex-col">
            <AppHeader />
            <div className="flex-1">{children}</div>
          </main>
        </AppSidebar>
      </body>
    </html>
  );
}
