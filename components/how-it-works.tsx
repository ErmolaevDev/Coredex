"use client"

import { motion } from "framer-motion"
import { Link2, Search, Sliders } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Подключите ваши аккаунты",
    description: "Свяжите вашу почту и другие сервисы для автоматического обнаружения подписок и цифровых активов.",
  },
  {
    number: "02",
    icon: Search,
    title: "Откройте все активы",
    description: "Наш AI сканирует и категоризирует все ваши повторяющиеся платежи и цифровые активы за считанные минуты.",
  },
  {
    number: "03",
    icon: Sliders,
    title: "Оптимизируйте и контролируйте",
    description: "Получайте персонализированные рекомендации по снижению расходов и полному контролю над цифровой жизнью.",
  },
]

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden bg-[#161415]">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#95122C]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-[#95122C] uppercase tracking-wide">Как это работает</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#F5F5F5] leading-tight">
            Три простых шага
          </h2>
          <p className="mt-6 text-lg text-[#A3A3A3] leading-relaxed">
            Настройка Coredex занимает менее 5 минут. Никаких сложных интеграций не требуется.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid gap-8 lg:grid-cols-3 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.number} variants={itemVariants} className="relative">
              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-4 w-8 h-px">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#95122C]/50 via-[#95122C]/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              )}

              {/* Card */}
              <motion.div
                className="relative rounded-2xl border border-[#3F3C3E] bg-gradient-to-br from-[#2A2729]/50 to-transparent p-8 transition-all duration-300"
                whileHover={{ y: -4, borderColor: "#95122C" }}
              >
                {/* Step number badge */}
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2"
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#95122C] to-[#c41e3a] shadow-lg shadow-[#95122C]/30">
                    <span className="text-sm font-bold text-white">{step.number}</span>
                  </div>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="mt-6 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[#95122C]/15 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <step.icon className="h-8 w-8 text-[#95122C]" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-[#A3A3A3] leading-relaxed text-center text-sm">
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#95122C] to-transparent opacity-0 rounded-b-2xl"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline for mobile */}
        <div className="mt-12 lg:hidden space-y-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-[#95122C] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="h-8 w-px bg-gradient-to-b from-[#95122C] to-transparent mt-2" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-[#F5F5F5] text-sm">{step.title}</h3>
                <p className="text-[#A3A3A3] text-xs mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
