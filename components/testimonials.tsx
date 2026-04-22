"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Сария Чен",
    role: "Product Designer",
    company: "Stripe",
    content: "Coredex помог мне найти 3 подписки, которые я забыл отменить. Сэкономила более $50/месяц сразу же.",
    rating: 5,
  },
  {
    name: "Марк Джонсон",
    role: "Engineering Lead",
    company: "Vercel",
    content: "Наконец-то одно место для управления всеми лицензиями. Функция семейного обмена — это игра-чейнджер.",
    rating: 5,
  },
  {
    name: "Елена Родригес",
    role: "Startup Founder",
    company: "TechFlow",
    content: "Функции безопасности дают мне уверенность. Знать, что мои учетные данные зашифрованы end-to-end — это решающее значение.",
    rating: 5,
  },
  {
    name: "Джеймс Лю",
    role: "Finance Manager",
    company: "Notion",
    content: "Развернули Coredex по всей команде. Видимость подписок компании просто невероятна.",
    rating: 5,
  },
  {
    name: "Анна Ковальски",
    role: "Digital Nomad",
    company: "Self-employed",
    content: "Управление подписками в разных странах и валютах было кошмаром. Coredex сделал это легко.",
    rating: 5,
  },
  {
    name: "Дэвид Парк",
    role: "CTO",
    company: "CloudBase",
    content: "Умные рекомендации действительно понимают мои модели использования. Как личный финансовый советник для подписок.",
    rating: 5,
  },
]

export function Testimonials() {
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
    <section className="py-24 lg:py-32 overflow-hidden bg-[#161415]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-[#95122C] uppercase tracking-wide">Отзывы</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#F5F5F5] leading-tight">
            Тысячам пользователей нравится Coredex
          </h2>
          <p className="mt-6 text-lg text-[#A3A3A3]">
            Узнайте, что говорит наше сообщество о том, как они восстановили контроль над своей цифровой жизнью.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative rounded-2xl border border-[#3F3C3E] bg-gradient-to-br from-[#2A2729]/50 to-transparent p-8 h-full transition-all duration-300 hover:border-[#95122C]/50">
                {/* Background accent */}
                <div className="absolute top-0 right-0 h-24 w-24 bg-[#95122C]/5 rounded-full blur-3xl -z-10" />

                {/* Quote icon */}
                <Quote className="h-6 w-6 text-[#95122C]/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Star className="h-4 w-4 fill-[#95122C] text-[#95122C]" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-[#C8C5C7] leading-relaxed mb-6 flex-1">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-[#3F3C3E]/50 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#95122C]/30 to-[#95122C]/10 flex-shrink-0">
                    <span className="text-sm font-semibold text-[#95122C]">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#F5F5F5] text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#A3A3A3]">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
