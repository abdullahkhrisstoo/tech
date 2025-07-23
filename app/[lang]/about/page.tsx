import Image from "next/image"
import { getDictionary } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"

export default async function AboutPage({
  params: { lang },
}: {
  params: { lang: "en" | "ar" }
}) {
  const dict = await getDictionary(lang)
  const isRtl = lang === "ar"

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container">
        <h1
          className={cn("text-4xl md:text-5xl font-bold text-center text-foreground mb-12", isRtl && "text-right")}
          data-aos="fade-down"
        >
          {dict.about_page.title}
        </h1>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className={cn("space-y-6", isRtl && "text-right")} data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">{dict.about_page.mission_title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{dict.about_page.mission_description}</p>
          </div>
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg" data-aos="zoom-in">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Our Mission"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg" data-aos="zoom-in">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Our Team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={cn("space-y-6", isRtl && "text-right")} data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">{dict.about_page.team_title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{dict.about_page.team_description}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
