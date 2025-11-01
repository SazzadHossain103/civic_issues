import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Navigation } from "@/components/navigation"
import "./globals.css"


const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "CIVIC ISSUES | Civic Issues Bangladesh",
  description: "Report local problems and help improve our community in Bangladesh",
  authors: [{ name: "Sazzad Hossain", url: "https://github.com/SazzadHossain103" }],
  keywords: [
    "Civic Issues", "Civic Issues Bangladesh", "Report Issues", "Community Improvement", "Local Problems", "Bangladesh",
    "Public Services", "Infrastructure Issues", "Environmental Concerns", "Urban Development", "Citizen Engagement",
    "Civic Participation", "Social Responsibility", "Government Accountability", "Public Awareness",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
