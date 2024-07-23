import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {SocialLogin} from "aa-conla-social-sdk"
const inter = Inter({ subsets: ["latin"] });

export const social = new SocialLogin("http://localhost:3000/oauth", "http://localhost:3000");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
