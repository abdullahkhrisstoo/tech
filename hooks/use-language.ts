"use client"

import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"

type Locale = "en" | "ar"

export function useLanguage() {
  const pathname = usePathname()
  const router = useRouter()

  const currentLocale = pathname.split("/")[1] as Locale

  const changeLanguage = useCallback(
    (newLocale: Locale) => {
      const segments = pathname.split("/")
      segments[1] = newLocale
      router.push(segments.join("/"))
    },
    [pathname, router],
  )

  return [currentLocale, changeLanguage] as const
}
