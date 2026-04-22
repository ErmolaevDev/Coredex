"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Check } from "lucide-react"
import { motion } from "framer-motion"

export function FinalCta() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#161415]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 lg:p-24"
          style={{
            background: "linear-gradient(135deg, rgba(42, 39, 41, 0.5) 0%, rgba(42, 39, 41, 0.2) 100%)",
            border: "1px solid rgba(63, 60, 62, 0.5)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Animated gradient background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#95122C]/10 via-transparent to-[#95122C]/5 opacity-50" />

          {/* Glowing orbs */}
          <motion.div
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(149, 18, 44, 0.3) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(149, 18, 44, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(245,245,245,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Badge */}
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#2A2729] px-5 py-2.5 border border-[#3F3C3E]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-4 w-4 text-[#95122C]" />
              <span className="text-sm text-[#A3A3A3] font-medium">
                Начните бесплатный период сегодня
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#F5F5F5] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Возьмите контроль над вашей
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#95122C] to-[#c41e3a] mt-2">
                цифровой жизнью
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mx-auto mt-8 max-w-xl text-lg text-[#A3A3A3] leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Присоединяйтесь к 50,000+ пользователям, которые доверяют Coredex управление своими подписками, лицензиями и цифровыми активами.
            </motion.p>

            {/* Trust signals */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#A3A3A3]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#95122C]" />
                <span>Zero-Knowledge</span>
              </div>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-[#3F3C3E]" />
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#95122C]" />
                <span>152-ФЗ Compliant</span>
              </div>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-[#3F3C3E]" />
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#95122C]" />
                <span>No CC Required</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group h-14 w-full rounded-xl bg-[#95122C] px-10 text-white hover:bg-[#c41e3a] font-semibold sm:w-auto transition-all shadow-lg shadow-[#95122C]/30 hover:shadow-[#95122C]/50"
                >
                  <span className="text-base">Начать бесплатно</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-full rounded-xl border-[#3F3C3E] bg-[#2A2729]/50 px-10 text-[#F5F5F5] hover:bg-[#2A2729] hover:border-[#95122C] sm:w-auto font-semibold"
              >
                <span className="text-base">Запланировать демо</span>
              </Button>
            </motion.div>

            {/* Trust note */}
            <motion.p
              className="mt-8 text-sm text-[#A3A3A3]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              ✨ Бесплатно до первого миллиона — кредитная карта не требуется
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
