import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Nav from "./Components/Shared/Navbar";
import AuthProvider from "@/services/AuthProvider";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Shared/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Electro-hub- Best Gadget Product",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <NextUIProvider>
          <AuthProvider>
            <Nav />
            <main className=" bg-background">
              <div className="min-h-[calc(100vh-145px)] md:max-w-7xl mx-auto">
                {children}
              </div>
            </main>
            <Footer />
          </AuthProvider>
          <Toaster position="top-center" />
        </NextUIProvider>
      </body>
    </html>
  );
}
