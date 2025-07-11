import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FatGPT - Unpredictably Honest AI | Cake Randelin",
  description:
    "The AI that responds with random sarcasm, conspiracy theories, or actual facts. You never know what you're gonna get!",
  keywords: "FatGPT, AI, chat, sarcastic AI, conspiracy AI, unpredictable AI, Cake Randelin",
  authors: [{ name: "Cake Randelin" }],
  creator: "Cake Randelin",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>{children}</body>
    </html>
  )
}
