import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

const locales = ["en", "ar"] // Supported locales
const defaultLocale = "en" // Default locale

function getLocale(request: NextRequest) {
  const acceptLanguageHeader = request.headers.get("accept-language")
  const languages = new Negotiator({ headers: { "accept-language": acceptLanguageHeader || "" } }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|.*\\..*).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
}
