"use client";
import Header from "@/Components/utils/Header";
import "./globals.css";
import Footer from "@/Components/utils/Footer";
import { ReduxProvider } from "/Redux/provider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, session }) {
  return (
    <ReduxProvider>
      <SessionProvider session={session}>
        <html lang="en">
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </SessionProvider>
    </ReduxProvider>
  );
}
