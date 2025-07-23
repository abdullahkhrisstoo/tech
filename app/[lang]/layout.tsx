import type React from "react"
import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getDictionary } from "@/lib/dictionaries" // Import getDictionary
import { AOSInitializer } from "@/components/aos-initializer" // Import AOSInitializer
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator" // Import the new component
import "../globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" })

export const metadata: Metadata = {
  title: "Tech Solutions",
  description: "Modern, responsive, bilingual technology website.",
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: "en" | "ar" }
}>) {
  const isRtl = params.lang === "ar"
  const dict = await getDictionary(params.lang) // Fetch dictionary here

  return (
    <html
      lang={params.lang}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        cairo.variable,
        isRtl ? "font-cairo" : "font-inter",
      )}
    >
      <body>
        <AOSInitializer /> {/* Initialize AOS */}
        <Header lang={params.lang} dictionary={dict} /> {/* Pass dictionary to Header */}
        <ScrollProgressIndicator /> {/* Add the scroll progress indicator here */}
        <main>{children}</main>
        <Footer lang={params.lang} dictionary={dict} /> {/* Pass dictionary to Footer */}
      </body>
    </html>
  )
}
