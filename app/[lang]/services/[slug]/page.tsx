import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

interface ServiceData {
  title: string
  description: string
  features: string[]
  imageUrl: string
}

const serviceContent: Record<string, { en: ServiceData; ar: ServiceData }> = {
  "ai-solutions": {
    en: {
      title: "AI Solutions",
      description:
        "We develop advanced AI solutions tailored to your business needs, from machine learning models to natural language processing applications. Our AI services help automate processes, gain insights, and enhance decision-making.",
      features: [
        "Custom ML Model Development",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Predictive Analytics",
        "AI Integration & Consulting",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    ar: {
      title: "حلول الذكاء الاصطناعي",
      description:
        "نقوم بتطوير حلول ذكاء اصطناعي متقدمة مصممة خصيصًا لاحتياجات عملك، من نماذج التعلم الآلي إلى تطبيقات معالجة اللغة الطبيعية. تساعد خدماتنا في الذكاء الاصطناعي على أتمتة العمليات، واكتساب الرؤى، وتعزيز اتخاذ القرار.",
      features: [
        "تطوير نماذج التعلم الآلي المخصصة",
        "معالجة اللغة الطبيعية (NLP)",
        "الرؤية الحاسوبية",
        "التحليلات التنبؤية",
        "تكامل واستشارات الذكاء الاصطناعي",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  },
  "3d-animation": {
    en: {
      title: "3D Animation",
      description:
        "Bring your ideas to life with stunning 3D animations. We create high-quality visual content for various industries, including advertising, entertainment, and product visualization. Our team uses the latest tools and techniques to deliver captivating animations.",
      features: [
        "Character Animation",
        "Product Visualization",
        "Architectural Walkthroughs",
        "Motion Graphics",
        "Visual Effects (VFX)",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    ar: {
      title: "الرسوم المتحركة ثلاثية الأبعاد",
      description:
        "اجعل أفكارك تنبض بالحياة مع رسوم متحركة ثلاثية الأبعاد مذهلة. نقوم بإنشاء محتوى مرئي عالي الجودة لمختلف الصناعات، بما في ذلك الإعلان والترفيه وتصور المنتجات. يستخدم فريقنا أحدث الأدوات والتقنيات لتقديم رسوم متحركة آسرة.",
      features: ["تحريك الشخصيات", "تصور المنتجات", "جولات معمارية", "رسومات متحركة", "المؤثرات البصرية (VFX)"],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  },
  "game-development": {
    en: {
      title: "Game Development",
      description:
        "From concept to launch, we offer end-to-end game development services for mobile, PC, and console platforms. Our passion for gaming drives us to create immersive and engaging experiences for players worldwide.",
      features: [
        "Concept & Design",
        "Programming & Engine Integration",
        "Art & Animation",
        "Sound Design",
        "Testing & Deployment",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    ar: {
      title: "تطوير الألعاب",
      description:
        "من الفكرة إلى الإطلاق، نقدم خدمات تطوير الألعاب الشاملة لمنصات الجوال والكمبيوتر ووحدات التحكم. يدفعنا شغفنا بالألعاب لإنشاء تجارب غامرة وجذابة للاعبين في جميع أنحاء العالم.",
      features: [
        "المفهوم والتصميم",
        "البرمجة وتكامل المحرك",
        "الفن والرسوم المتحركة",
        "تصميم الصوت",
        "الاختبار والنشر",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  },
  "mobile-apps": {
    en: {
      title: "Mobile Apps",
      description:
        "Develop intuitive and high-performing mobile applications for iOS and Android. We focus on user experience and robust functionality to ensure your app stands out in the competitive market.",
      features: [
        "Native iOS & Android Development",
        "Cross-Platform Development (React Native, Flutter)",
        "UI/UX Design for Mobile",
        "Backend Integration",
        "App Store Optimization (ASO)",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    ar: {
      title: "تطبيقات الجوال",
      description:
        "تطوير تطبيقات جوال بديهية وعالية الأداء لنظامي iOS و Android. نركز على تجربة المستخدم والوظائف القوية لضمان تميز تطبيقك في السوق التنافسي.",
      features: [
        "تطوير iOS و Android الأصلي",
        "تطوير عبر الأنظمة الأساسية (React Native, Flutter)",
        "تصميم واجهة وتجربة المستخدم للجوال",
        "تكامل الواجهة الخلفية",
        "تحسين متجر التطبيقات (ASO)",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  },
  "erp-systems": {
    en: {
      title: "ERP Systems",
      description:
        "Streamline your business operations with custom Enterprise Resource Planning (ERP) systems. We design and implement integrated solutions that manage your core business processes, from finance to supply chain.",
      features: [
        "Custom ERP Development",
        "Module Integration (CRM, HR, Finance)",
        "Data Migration & Analytics",
        "System Customization",
        "Support & Maintenance",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    ar: {
      title: "أنظمة تخطيط موارد المؤسسات",
      description:
        "تبسيط عمليات عملك باستخدام أنظمة تخطيط موارد المؤسسات (ERP) المخصصة. نقوم بتصميم وتنفيذ حلول متكاملة تدير عمليات عملك الأساسية، من المالية إلى سلسلة التوريد.",
      features: [
        "تطوير نظام ERP مخصص",
        "تكامل الوحدات (CRM, HR, المالية)",
        "ترحيل البيانات والتحليلات",
        "تخصيص النظام",
        "الدعم والصيانة",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  },
  "ui-ux-design": {
    en: {
      title: "UI/UX Design",
      description:
        "Create engaging and user-friendly digital experiences with our UI/UX design services. We focus on intuitive interfaces and seamless interactions to ensure your product is both beautiful and functional.",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "User Interface (UI) Design",
        "User Experience (UX) Design",
        "Usability Testing",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    ar: {
      title: "تصميم واجهة وتجربة المستخدم",
      description:
        "أنشئ تجارب رقمية جذابة وسهلة الاستخدام من خلال خدمات تصميم واجهة وتجربة المستخدم لدينا. نركز على الواجهات البديهية والتفاعلات السلسة لضمان أن يكون منتجك جميلًا وعمليًا.",
      features: [
        "بحث وتحليل المستخدم",
        "النماذج الأولية والتخطيط",
        "تصميم واجهة المستخدم (UI)",
        "تصميم تجربة المستخدم (UX)",
        "اختبار قابلية الاستخدام",
      ],
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  },
}

export async function generateStaticParams() {
  const slugs = Object.keys(serviceContent)
  const locales = ["en", "ar"]
  const params = []

  for (const slug of slugs) {
    for (const lang of locales) {
      params.push({ slug, lang })
    }
  }
  return params
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string; lang: "en" | "ar" }
}) {
  const { slug, lang } = params
  const dict = await getDictionary(lang)
  const isRtl = lang === "ar"

  const service = serviceContent[slug]?.[lang]

  if (!service) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
        <p className="text-muted-foreground">The requested service could not be found.</p>
        <Link href={`/${lang}/services`}>
          <Button className="mt-4">{dict.services_section.back_to_services}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container">
        <Link
          href={`/${lang}/services`}
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
          {dict.services_section.back_to_services}
        </Link>

        <h1
          className={cn("text-4xl md:text-5xl font-bold text-foreground mb-8", isRtl && "text-right")}
          data-aos="fade-down"
        >
          {service.title}
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={cn("space-y-6", isRtl && "text-right")} data-aos="fade-right">
            <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
            <h3 className="text-2xl font-semibold text-foreground mt-8">
              {isRtl ? "الميزات الرئيسية" : "Key Features"}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {service.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                  data-aos="fade-right"
                  data-aos-delay={`${index * 50}`}
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg" data-aos="zoom-in">
            <Image
              src={service.imageUrl || "/placeholder.svg"}
              alt={service.title}
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
