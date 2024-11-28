// src/app/layout.tsx
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {/* <Header /> */}
          {children}
          </ReduxProvider>
      </body>
    </html>
  );
}