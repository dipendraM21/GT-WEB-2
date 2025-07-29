// src/app/layout.tsx
import "@/app/(web)/globals.css";
import DefaultPage from "@/components/web/DefaultPage/defaultPage";
import { QueryProvider } from "@/providers/QueryProvider";
import ThemeProvider from "@/providers/theme-provider";
import "@/styles/cards.css";
import "@/styles/common.css";
import "@/styles/commonMarginPadding.css";
import "@/styles/error-page.css";
import "@/styles/flex-class.css";
import "@/styles/fonts.css";
import "@/styles/home.css";
import "@/styles/navbar.css";
import "@/styles/popup-modal.css";
import "@/styles/radio-btn.css";
import "@/styles/tabs.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import "react-responsive-modal/styles.css";
import { Toaster } from "sonner";

const Maison = localFont({
  src: [
    {
      path: "../../public/fonts/Maison-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Maison-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Maison-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Maison-Demi.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Maison-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-maison",
});
export const metadata: Metadata = {
  title: "Gayatri Travels Web",
  description: "Gayatri Travels customer portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={Maison.className}>
      <ThemeProvider>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossOrigin=""
          />
        </head>
        <body>
          <Toaster richColors position="top-right" theme="dark" />
          <QueryProvider>
            <DefaultPage>{children}</DefaultPage>
          </QueryProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
