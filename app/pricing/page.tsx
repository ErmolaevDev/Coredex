import { Header } from "@/components/header"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export const metadata = {
  title: "Тарифы Coredex | Доступное управление цифровыми активами",
  description: "Выберите оптимальный тариф для управления вашими подписками, лицензиями и цифровыми активами. Бесплатный план, Pro и Family.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#161415]">
      <Header />
      
      {/* Hero section for pricing page */}
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-[#95122C]/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F5F5F5] leading-tight">
            Найдите свой идеальный план
          </h1>
          <p className="mt-6 text-lg text-[#A3A3A3] max-w-2xl mx-auto">
            От фрилансеров и студентов до семей и организаций — у нас есть план для каждого.
          </p>
        </div>
      </section>

      <Pricing />
      <FAQ />
      <FinalCta />
      <Footer />
    </main>
  )
}
