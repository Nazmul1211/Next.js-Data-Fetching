import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navBar/page";
import NextAuthSessionProvider from "@/Providers/NextAuthSessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins ({
  weight: ["100", "200", "400", "500", "600", "800"],
  subsets: ["latin",]
})

export const metadata = {
  title: {
    default: "Next.js Data Fetching",
    template: "%s | Learning Next.js"
  },
  description: "This page is about next.js data fetching techniques.",
  keywords: ['next.js', 'learning', 'react', 'javascript'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
      <body
        className={`${poppins.className} antialiased mx-4 mb-4`}
      >
        <Navbar></Navbar>
        {children}
      </body>
      </NextAuthSessionProvider>
    </html>
  );
}
