import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ForWhom } from "@/components/for-whom"
import { Benefits } from "@/components/benefits"
import { HowItWorks } from "@/components/how-it-works"
import { SocialProof } from "@/components/social-proof"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#161415]">
      <Header />
      <Hero />
      <ForWhom />
      <Benefits />
      <HowItWorks />
      <SocialProof />
      <Testimonials />
      <FAQ />
      <FinalCta />
      <Footer />
    </main>
  )
}
