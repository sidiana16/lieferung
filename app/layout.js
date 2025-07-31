import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-backgroundColor text-mainFontColor antialiased`}
      >
        <Header />
        {children}
        {modal}
      </body>
    </html>
  );
}
