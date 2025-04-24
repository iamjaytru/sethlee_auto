import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sethelee Auto - Find Your Perfect Drive",
  description: "Browse our extensive collection of premium vehicles and drive away with confidence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
