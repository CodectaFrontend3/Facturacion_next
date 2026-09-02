import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Facturador Electrónico",
  description: "Sistema de facturación electrónica, inventario, ventas y servicios SUNAT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var desc = Object.getOwnPropertyDescriptor(window, 'fetch');
                  if (!desc && typeof Window !== 'undefined' && Window.prototype) {
                    desc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
                  }
                  if (desc && desc.get && !desc.set) {
                    var currentFetch = window.fetch;
                    try {
                      Object.defineProperty(window, 'fetch', {
                        get: function() { return currentFetch; },
                        set: function(fn) { currentFetch = fn; },
                        configurable: true,
                        enumerable: true
                      });
                    } catch(e) {}
                  }
                } catch(err) {}
              })();
            `,
          }}
        />
      </head>
      {/* Todo el diseño de Tailwind Base */}
      {/* AÑADIMOS suppressHydrationWarning AQUÍ 👇 */}
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-white text-gray-800">
        {children}
        <Toaster/>
      </body>
    </html>
  );
}