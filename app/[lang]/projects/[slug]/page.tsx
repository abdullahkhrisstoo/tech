import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"

interface ProjectData {
  title: string
  description: string
  techUsed: string
  outcome: string
  imageUrl: string
}

const projectContent: Record<string, { en: ProjectData; ar: ProjectData }> = {
  project1: {
    en: {
      title: "Smart City Dashboard",
      description:
        "Developed an interactive dashboard for smart city management, integrating real-time data from various sensors to monitor traffic, air quality, and public safety. The dashboard provides actionable insights for urban planners.",
      techUsed: "React, Node.js, MongoDB, D3.js",
      outcome: "Improved urban planning efficiency by 30% and enhanced public safety monitoring.",
      imageUrl: "/placeholder.svg?height=500&width=800",
    },
    ar: {
      title: "لوحة تحكم المدينة الذكية",
      description:
        "تم تطوير لوحة تحكم تفاعلية لإدارة المدينة الذكية، ودمج البيانات في الوقت الفعلي من أجهزة استشعار مختلفة لمراقبة حركة المرور وجودة الهواء والسلامة العامة. توفر لوحة التحكم رؤى قابلة للتنفيذ لمخططي المدن.",
      techUsed: "React, Node.js, MongoDB, D3.js",
      outcome: "تحسين كفاءة التخطيط الحضري بنسبة 30% وتعزيز مراقبة السلامة العامة.",
      imageUrl: "/placeholder.svg?height=500&width=800",
    },
  },
  project2: {
    en: {
      title: "E-commerce Platform Redesign",
      description:
        "Revamped an existing e-commerce platform with a modern UI/UX, improved performance, and new features like personalized recommendations and a streamlined checkout process. Resulted in significant increase in conversion rates.",
      techUsed: "Next.js, Tailwind CSS, Strapi CMS, PostgreSQL",
      outcome: "Increased conversion rates by 15% and reduced page load times by 40%.",
      imageUrl: "/placeholder.svg?height=500&width=800",
    },
    ar: {
      title: "إعادة تصميم منصة التجارة الإلكترونية",
      description:
        "تم تجديد منصة تجارة إلكترونية موجودة بواجهة مستخدم/تجربة مستخدم حديثة، وأداء محسّن، وميزات جديدة مثل التوصيات المخصصة وعملية دفع مبسطة. أدى ذلك إلى زيادة كبيرة في معدلات التحويل.",
      techUsed: "Next.js, Tailwind CSS, Strapi CMS, PostgreSQL",
      outcome: "زيادة معدلات التحويل بنسبة 15% وتقليل أوقات تحميل الصفحات بنسبة 40%.",
      imageUrl: "/placeholder.svg?height=500&width=800",
    },
  },
  project3: {
    en: {
      title: "Healthcare AI Diagnostic Tool",
      description:
        "Built an AI-powered diagnostic tool for early detection of diseases using medical imaging. The tool assists healthcare professionals in making more accurate and timely diagnoses, improving patient outcomes.",
      techUsed: "Python, TensorFlow, Flask, React",
      outcome: "Achieved 95% accuracy in disease detection and significantly reduced diagnostic time.",
      imageUrl: "/placeholder.svg?height=500&width=800",
    },
    ar: {
      title: "أداة تشخيص الذكاء الاصطناعي للرعاية الصحية",
      description:
        "تم بناء أداة تشخيص مدعومة بالذكاء الاصطناعي للكشف المبكر عن الأمراض باستخدام التصوير الطبي. تساعد الأداة المتخصصين في الرعاية الصحية على إجراء تشخيصات أكثر دقة وفي الوقت المناسب، مما يحسن نتائج المرضى.",
      techUsed: "Python, TensorFlow, Flask, React",
      outcome: "تحقيق دقة 95% في الكشف عن الأمراض وتقليل وقت التشخيص بشكل كبير.",
      imageUrl: "/placeholder.svg?height=500&width=800",
    },
  },
}

export async function generateStaticParams() {
  const slugs = Object.keys(projectContent)
  const locales = ["en", "ar"]
  const params = []

  for (const slug of slugs) {
    for (const lang of locales) {
      params.push({ slug, lang })
    }
  }
  return params
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string; lang: "en" | "ar" }
}) {
  const { slug, lang } = params
  const dict = await getDictionary(lang)
  const isRtl = lang === "ar"

  const project = projectContent[slug]?.[lang]

  if (!project) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <p className="text-muted-foreground">The requested project could not be found.</p>
        <Link href={`/${lang}/projects`}>
          <Button className="mt-4">{dict.projects_section.back_to_projects}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container">
        <Link
          href={`/${lang}/projects`}
          className="inline-flex items-center text-primary hover:underline mb-8"
          data-aos="fade-right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("mr-2", isRtl && "rotate-180 ml-2 mr-0")}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {dict.projects_section.back_to_projects}
        </Link>

        <h1
          className={cn("text-4xl md:text-5xl font-bold text-foreground mb-8", isRtl && "text-right")}
          data-aos="fade-down"
        >
          {project.title}
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={cn("space-y-6", isRtl && "text-right")} data-aos="fade-right">
            <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground mt-8">
                {isRtl ? "التقنيات المستخدمة" : "Technologies Used"}
              </h3>
              <p className="text-muted-foreground">{project.techUsed}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground mt-8">{isRtl ? "النتيجة" : "Outcome"}</h3>
              <p className="text-muted-foreground">{project.outcome}</p>
            </div>
          </div>
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg" data-aos="zoom-in">
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
