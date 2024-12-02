// src/app/layout.tsx
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { Header } from "@/components/layout/Header";
import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable}`}>
        <ReduxProvider>
          {/* <Header /> */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
