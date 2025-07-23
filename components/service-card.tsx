import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  lang: "en" | "ar"
  aosDelay: string // Added for AOS animation delay
}

export function ServiceCard({ title, description, href, lang, aosDelay }: ServiceCardProps) {
  return (
    <Link href={`/${lang}${href}`} data-aos="fade-up" data-aos-delay={aosDelay}>
      <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:border-primary transform hover:-translate-y-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            <ArrowRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
