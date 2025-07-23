import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  href: string
  lang: "en" | "ar"
  aosDelay: string // Added for AOS animation delay
}

export function ProjectCard({ title, description, imageUrl, href, lang, aosDelay }: ProjectCardProps) {
  return (
    <Link href={`/${lang}${href}`} data-aos="fade-up" data-aos-delay={aosDelay}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary transform hover:-translate-y-2">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-primary group-hover:underline transition-colors duration-200">
            View Project
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
