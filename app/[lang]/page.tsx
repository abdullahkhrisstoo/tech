import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/dictionaries"
import { ServiceCard } from "@/components/service-card"
import { ProjectCard } from "@/components/project-card"
import { ContactForm } from "@/components/contact-form"
import { cn } from "@/lib/utils"
import { NeuralNetworkCanvas } from "@/components/neural-network-canvas" // Import the new component

export async function generateStaticParams() {
  return [
    { lang: 'en' }, // اللغة الإنجليزية
    { lang: 'ar' }, // اللغة العربية
  ];
}

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: "en" | "ar" }
}) {
  const dict = await getDictionary(lang)
  const isRtl = lang === "ar"

  const services = [
    {
      slug: "ai-solutions",
      title: dict.services_section.ai_solutions,
      description: isRtl ? "حلول متقدمة للذكاء الاصطناعي لعملك." : "Advanced AI solutions for your business.",
    },
    {
      slug: "3d-animation",
      title: dict.services_section["3d_animation"],
      description: isRtl ? "رسوم متحركة ثلاثية الأبعاد مذهلة لمشاريعك." : "Stunning 3D animations for your projects.",
    },
    {
      slug: "game-development",
      title: dict.services_section.game_development,
      description: isRtl ? "تطوير ألعاب جذابة لمنصات متعددة." : "Engaging game development for multiple platforms.",
    },
    {
      slug: "mobile-apps",
      title: dict.services_section.mobile_apps,
      description: isRtl ? "تطبيقات جوال مبتكرة لنظامي iOS و Android." : "Innovative mobile apps for iOS and Android.",
    },
    {
      slug: "erp-systems",
      title: dict.services_section.erp_systems,
      description: isRtl
        ? "أنظمة تخطيط موارد المؤسسات المخصصة لتبسيط العمليات."
        : "Custom ERP systems to streamline operations.",
    },
    {
      slug: "ui-ux-design",
      title: dict.services_section.ui_ux_design,
      description: isRtl ? "تصميم واجهة وتجربة مستخدم بديهية." : "Intuitive UI/UX design for seamless experiences.",
    },
  ]

  const projects = [
    {
      slug: "project1",
      title: dict.project_detail.project1_title,
      description: isRtl ? "لوحة تحكم ذكية للمدينة." : "An intelligent dashboard for smart city management.",
      imageUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      slug: "project2",
      title: dict.project_detail.project2_title,
      description: isRtl ? "إعادة تصميم منصة التجارة الإلكترونية." : "A complete redesign of an e-commerce platform.",
      imageUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      slug: "project3",
      title: dict.project_detail.project3_title,
      description: isRtl ? "أداة تشخيص الذكاء الاصطناعي للرعاية الصحية." : "AI diagnostic tool for healthcare.",
      imageUrl: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center bg-background overflow-hidden">
        <NeuralNetworkCanvas /> {/* Neural network canvas background */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4" data-aos="fade-up" data-aos-delay="100">
            {isRtl ? "مستقبل مدعوم بالذكاء الاصطناعي" : "AI-Powered Future"}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8" data-aos="fade-up" data-aos-delay="300">
            {isRtl
              ? "مرحبًا بكم في عالم الشبكات العصبية والابتكار"
              : "Welcome to the world of neural networks and innovation"}
          </p>
          <Link href={`/${lang}/contact`} data-aos="fade-up" data-aos-delay="500">
            <Button size="lg" className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              {dict.header.contact}
            </Button>
          </Link>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section className="py-16 md:py-24 bg-background" data-aos="fade-up">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className={cn("space-y-6", isRtl && "text-right")}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-aos="fade-right">
              {dict.about_preview.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed" data-aos="fade-right" data-aos-delay="100">
              {dict.about_preview.description}
            </p>
            <Link href={`/${lang}/about`} data-aos="fade-right" data-aos-delay="200">
              <Button
                variant="outline"
                className="transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] bg-transparent"
              >
                {dict.about_preview.read_more}
              </Button>
            </Link>
          </div>
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg" data-aos="zoom-in">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Team collaboration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 md:py-24 bg-muted" data-aos="fade-up">
        <div className="container">
          <h2
            className={cn("text-3xl md:text-4xl font-bold text-center text-foreground mb-12", isRtl && "text-right")}
            data-aos="fade-down"
          >
            {dict.services_section.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                description={service.description}
                href={`/services/${service.slug}`}
                lang={lang}
                aosDelay={`${index * 100}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24 bg-background" data-aos="fade-up">
        <div className="container">
          <h2
            className={cn("text-3xl md:text-4xl font-bold text-center text-foreground mb-12", isRtl && "text-right")}
            data-aos="fade-down"
          >
            {dict.projects_section.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                href={`/projects/${project.slug}`}
                lang={lang}
                aosDelay={`${index * 100}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 md:py-24 bg-muted" data-aos="fade-up">
        <div className="container grid md:grid-cols-2 gap-12 items-start">
          <div className={cn("space-y-6", isRtl && "text-right")}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-aos="fade-right">
              {dict.contact_section.title}
            </h2>
            <p className="text-lg text-muted-foreground" data-aos="fade-right" data-aos-delay="100">
              {isRtl ? "لدينا فريق جاهز للإجابة على أسئلتك." : "Our team is ready to answer your questions."}
            </p>
            <div className="space-y-2" data-aos="fade-right" data-aos-delay="200">
              <p className="text-muted-foreground">
                <strong>{dict.contact_section.address}:</strong>{" "}
                {isRtl ? "123 شارع التكنولوجيا، مدينة الابتكار، 12345" : "123 Tech Street, Innovation City, 12345"}
              </p>
              <p className="text-muted-foreground">
                <strong>{dict.contact_section.phone}:</strong> +1 (234) 567-8900
              </p>
              <p className="text-muted-foreground">
                <strong>{dict.contact_section.email_contact}:</strong> info@techsolutions.com
              </p>
            </div>
          </div>
          <div data-aos="fade-left">
            <ContactForm dict={dict} isRtl={isRtl} />
          </div>
        </div>
      </section>
    </>
  )
}
