"use client"

import { motion } from "framer-motion"
import { TrendingDown, Clock, Shield, Smile } from "lucide-react"

const benefits = [
  {
    title: "Экономия денег",
    description: "Отслеживайте все подписки, находите дублирующиеся и получайте уведомления о возможных экономиях",
    icon: TrendingDown,
    stat: "-40%",
    statLabel: "средней экономии",
    color: "#95122C",
  },
  {
    title: "Экономия времени",
    description: "Управляйте всем в одном месте вместо переключения между десятками платформ",
    icon: Clock,
    stat: "5+ часов",
    statLabel: "сэкономлено в месяц",
    color: "#c41e3a",
  },
  {
    title: "Безопасность",
    description: "Zero-Knowledge архитектура, 152-ФЗ compliant, militarized encryption для абсолютной защиты",
    icon: Shield,
    stat: "Military",
    statLabel: "уровень шифрования",
    color: "#d6417e",
  },
  {
    title: "Спокойствие",
    description: "Полный контроль над цифровыми активами, автоматизация, резервные копии и цифровое наследие",
    icon: Smile,
    stat: "100%",
    statLabel: "контроля всегда",
    color: "#e868a2",
  },
]

export function Benefits() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="relative py-24 lg:py-32 bg-[#161415] overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#95122C]/5 blur-[100px]" />
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
          <p className="text-sm font-semibold text-[#95122C] uppercase tracking-wide">Преимущества</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#F5F5F5] leading-tight">
            Четыре главных преимущества
          </h2>
          <p className="mt-6 text-lg text-[#A3A3A3]">
            Почему тысячи пользователей доверяют Coredex управление своими цифровыми активами
          </p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group"
              >
                <div
                  className="relative overflow-hidden rounded-2xl p-8 border border-[#3F3C3E] 
                    bg-gradient-to-br from-[#2A2729] to-[#161415] backdrop-blur-sm
                    transition-all duration-300 hover:border-[#95122C]/50 hover:shadow-soft-lg"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#95122C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and stat */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${benefit.color}20` }}
                        whileHover={{ scale: 1.08, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Icon className="h-6 w-6" style={{ color: benefit.color }} />
                      </motion.div>

                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: benefit.color }}>
                          {benefit.stat}
                        </div>
                        <p className="text-xs text-[#A3A3A3] mt-1">{benefit.statLabel}</p>
                      </div>
                    </div>

                    {/* Title and description */}
                    <h3 className="text-xl font-semibold text-[#F5F5F5] mb-3">
                      {benefit.title}
                    </h3>

                    <p className="text-[#A3A3A3] leading-relaxed">
                      {benefit.description}
                    </p>

                    {/* Accent line on bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#95122C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-[#A3A3A3]">
            Вам нужны конкретные цифры? 
            <span className="text-[#95122C] font-semibold ml-1">Посмотрите наш Case Study →</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
