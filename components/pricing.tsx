"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Для тех, кто только начинает",
    features: [
      "До 10 подписок",
      "Базовая статистика трат",
      "Email уведомления",
      "Стандартная поддержка",
      "Базовая безопасность",
    ],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Pro",
    price: "$4",
    period: "/месяц",
    description: "Для профессионалов с полным контролем",
    features: [
      "Все в Free",
      "Неограниченные подписки",
      "Продвинутая аналитика",
      "Цифровой сейф активов",
      "Умная рекомендация",
      "API доступ",
      "Приоритетная поддержка",
    ],
    cta: "Начать Pro",
    popular: false,
  },
  {
    name: "Family",
    price: "$8",
    period: "/месяц",
    description: "Для семей с полным управлением",
    features: [
      "Все в Pro",
      "До 5 членов семьи",
      "Делиться подписками",
      "Семейная панель управления",
      "Родительский контроль",
      "Выделенная поддержка 24/7",
      "Цифровое наследие",
    ],
    cta: "Начать Family",
    popular: true,
  },
]

export function Pricing() {
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
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden bg-[#161415]">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-[#95122C]/5 blur-[120px]" />
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
          <p className="text-sm font-semibold text-[#95122C] uppercase tracking-wide">Тарифы</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#F5F5F5] leading-tight">
            Прозрачное ценообразование
          </h2>
          <p className="mt-6 text-lg text-[#A3A3A3]">
            Начните бесплатно и обновить по мере роста. Нет скрытых комиссий, отмена в любой момент.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={plan.popular ? { y: -8 } : { y: -4 }}
              className={`relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
                plan.popular
                  ? "lg:scale-105 border-[#95122C]/50 bg-gradient-to-br from-[#2A2729] to-[#161415]"
                  : "border-[#3F3C3E] bg-gradient-to-br from-[#2A2729]/50 to-[#161415]"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-gradient-to-r from-[#95122C] to-[#c41e3a] text-white border-0 px-4 py-1.5 shadow-lg shadow-[#95122C]/30">
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    Самый популярный
                  </Badge>
                </motion.div>
              )}

              {/* Glow effect for popular plan */}
              {plan.popular && (
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#95122C]/20 to-transparent opacity-50 -z-10" />
              )}

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#F5F5F5]">{plan.name}</h3>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-[#F5F5F5]">{plan.price}</span>
                  <span className="text-[#A3A3A3] text-lg">{plan.period}</span>
                </div>

                {/* Description */}
                <p className="mt-3 text-[#A3A3A3] text-sm">{plan.description}</p>

                {/* CTA Button */}
                <Link href="/login" className="block mt-8">
                  <Button
                    className={`w-full h-12 font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-[#95122C] text-white hover:bg-[#c41e3a] shadow-lg shadow-[#95122C]/30 hover:shadow-[#95122C]/50"
                        : "bg-[#2A2729] text-[#F5F5F5] border border-[#3F3C3E] hover:bg-[#3F3C3E] hover:border-[#95122C]"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>

                {/* Trust note */}
                <p className="mt-6 text-center text-xs text-[#A3A3A3]">
                  14-дневный бесплатный период. Карта не требуется.
                </p>

                {/* Features divider */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#3F3C3E] to-transparent" />

                {/* Features list */}
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={feature}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div
                        className={`flex-shrink-0 mt-1 h-5 w-5 rounded-full flex items-center justify-center ${
                          plan.popular
                            ? "bg-[#95122C]/20"
                            : "bg-[#3F3C3E]/50"
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 ${
                            plan.popular
                              ? "text-[#95122C]"
                              : "text-[#95122C]"
                          }`}
                        />
                      </div>
                      <span className="text-sm text-[#C8C5C7]">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-[#A3A3A3]">
            Все планы включают расширенную поддержку и обновления.{" "}
            <span className="text-[#95122C] font-semibold">
              Сравнить все функции →
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
