"use client" // Changed to client component to handle scroll events

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface HeaderProps {
  lang: "en" | "ar"
  dictionary: any // Pass dictionary as prop since it's a client component now
}

export function Header({ lang, dictionary }: HeaderProps) {
  const isRtl = lang === "ar"
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinks = [
    { href: "/", label: dictionary.header.home },
    { href: "/about", label: dictionary.header.about },
    { href: "/services", label: dictionary.header.services },
    { href: "/projects", label: dictionary.header.projects },
    { href: "/contact", label: dictionary.header.contact },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-sm shadow-sm"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-lg">
          <span className="sr-only">Tech Solutions Logo</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-cpu"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 7h10v10H7z" />
            <path d="M6 3v18" />
            <path d="M18 3v18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
          Tech Solutions
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${lang}${link.href}`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRtl ? "right" : "left"} className={cn(isRtl && "text-right")}>
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${lang}${link.href}`}
                    className="text-lg font-medium hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
