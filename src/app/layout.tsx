'use client'
// import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Headland_One } from "next/font/google"
import AuthProvider from "@/services/AuthProvider";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Shared/Footer";
import Nav from "../components/Shared/Navbar";
import BottomNavbar from "../components/Shared/BottomNavbar";
export const dynamic = 'force-dynamic';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient()
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const headland_one = Headland_One({
  weight: ['400'],
  subsets: ['latin']
})
// export const metadata: Metadata = {
//   title: "Electro-hub- Best Gadget Product",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${headland_one.className} antialiased bg-background`}
      >
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <AuthProvider>

              <Nav />
              <main className=" bg-background">
                <div className="min-h-[calc(100vh-145px)] md:max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
              <BottomNavbar />
              <Footer />
            </AuthProvider>
            <Toaster position="top-center" />
          </NextUIProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
