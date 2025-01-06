// src/app/layout.tsx
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Skinsight",
    template: "%s | Skinsight",
  },
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-dm-sans`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          {children}
          {modal}
        </ReduxProvider>
        <div id="modal" />
      </body>
    </html>
  );
}
