import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/app-sidebar";

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
          <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        </AppSidebar>
      </body>
    </html>
  );
}
