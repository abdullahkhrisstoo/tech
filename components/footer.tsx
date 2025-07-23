import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

interface FooterProps {
  lang: "en" | "ar"
  dictionary: any // Pass dictionary as prop
}

export function Footer({ lang, dictionary }: FooterProps) {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-lg mb-2">
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
          <p className="text-sm text-muted-foreground">{dictionary.footer.copyright}</p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
