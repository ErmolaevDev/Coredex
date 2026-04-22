import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Users, Target, Shield, Zap } from "lucide-react"

export const metadata = {
  title: "О Coredex | Наша миссия и команда",
  description: "Узнайте больше о Coredex, нашей миссии по защите цифровых активов и команде.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Безопасность прежде всего",
      description: "Zero-Knowledge архитектура, военное-уровневое шифрование, полная приватность.",
    },
    {
      icon: Users,
      title: "Для каждого",
      description: "От профессионалов до семей — каждый заслуживает контроля над своими активами.",
    },
    {
      icon: Target,
      title: "Простота использования",
      description: "Интуитивный интерфейс, который не требует технических знаний.",
    },
    {
      icon: Zap,
      title: "Постоянное развитие",
      description: "Мы постоянно добавляем новые функции на основе отзывов пользователей.",
    },
  ]

  return (
    <main className="min-h-screen bg-[#161415]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-[#95122C]/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold text-[#95122C] uppercase tracking-wide mb-6">О нас</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F5F5F5] leading-tight mb-6">
            Наша миссия: вернуть контроль над цифровой жизнью
          </h1>
          <p className="text-xl text-[#A3A3A3] max-w-3xl mx-auto leading-relaxed">
            Мы верим, что каждый имеет право на полный контроль над своими цифровыми активами, от подписок и лицензий до API-ключей и умного дома.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 border-y border-[#3F3C3E]/50">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#F5F5F5] mb-6">Как всё начиналось</h2>
            <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed">
              Коредекс была создана группой инженеров и дизайнеров, которые устали управлять десятками подписок, потеря информации о которых были вариантом, а также беспокоясь о зашифрованности своих цифровых активов.
            </p>
            <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed">
              Мы поняли, что нет единого решения, которое было бы как простым в использовании, так и достаточно безопасным для защиты критических данных. Поэтому мы создали Coredex.
            </p>
            <p className="text-lg text-[#A3A3A3] leading-relaxed">
              Сегодня более 50 тысяч пользователей доверяют нам управление своими цифровыми активами, и это число растёт каждый день.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#2A2729] to-[#161415] rounded-2xl border border-[#3F3C3E] p-12 flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl font-bold text-[#95122C] mb-4">50K+</div>
              <p className="text-[#A3A3A3]">Пользователей по всему миру</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#F5F5F5] mb-6">Наши ценности</h2>
            <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto">
              То, что мы делаем и как мы это делаем, определяется четырьмя основными ценностями.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#3F3C3E] bg-gradient-to-br from-[#2A2729]/50 to-transparent p-8 hover:border-[#95122C]/50 transition-all"
                >
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-[#95122C]/20">
                    <Icon className="h-6 w-6 text-[#95122C]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#F5F5F5] mb-3">{value.title}</h3>
                  <p className="text-[#A3A3A3]">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-y border-[#3F3C3E]/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#95122C] mb-2">2020</div>
              <p className="text-[#A3A3A3]">Год основания</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#95122C] mb-2">50K+</div>
              <p className="text-[#A3A3A3]">Активных пользователей</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#95122C] mb-2">180+</div>
              <p className="text-[#A3A3A3]">Стран</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#95122C] mb-2">$2.4M</div>
              <p className="text-[#A3A3A3]">Сэкономлено в месяц</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
