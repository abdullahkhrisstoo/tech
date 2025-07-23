"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function LanguageSwitcher() {
  const [currentLocale, changeLanguage] = useLanguage()

  const handleToggle = () => {
    changeLanguage(currentLocale === "en" ? "ar" : "en")
  }

  return (
    <Button variant="ghost" onClick={handleToggle} aria-label="Toggle language">
      {currentLocale === "en" ? "العربية" : "English"}
    </Button>
  )
}
