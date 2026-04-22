"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Lock, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const glowVariants = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-36 bg-[#161415]">
      {/* Premium background with dark theme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main gradient blob */}
        <motion.div
          className="absolute -top-1/3 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(149, 18, 44, 0.15) 0%, transparent 70%)",
          }}
          variants={glowVariants}
          animate="animate"
        />

        {/* Secondary accent glow */}
        <motion.div
          className="absolute top-1/3 right-0 h-[700px] w-[700px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(149, 18, 44, 0.08) 0%, transparent 70%)",
          }}
          variants={glowVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,245,245,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
        >
          {/* Premium badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-3 rounded-full bg-[#2A2729] px-6 py-2.5 border border-[#3F3C3E] hover:scale-105 transition-transform"
            variants={itemVariants}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-[#95122C] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#95122C]" />
            </span>
            <span className="text-sm font-medium text-[#A3A3A3]">
              🔐 Enterprise-grade security
            </span>
            <Sparkles className="h-3.5 w-3.5 text-[#95122C]" />
          </motion.div>

          {/* Main headline - bigger, bolder */}
          <motion.h1
            className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-[#F5F5F5] leading-[1.15]"
            variants={itemVariants}
          >
            Coredex
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#95122C] to-[#c41e3a] mt-2">
              ваш цифровой сейф
            </span>
            <span className="block text-[#A3A3A3] text-3xl sm:text-4xl lg:text-5xl font-medium mt-4">
              и центр управления активами
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-[#A3A3A3] leading-relaxed"
            variants={itemVariants}
          >
            Подписки, лицензии, API-ключи, умный дом, цифровое наследие — всё в
            одном защищённом месте. Коллаборация в семье, полный контроль,
            спокойствие.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
              <Shield className="h-4 w-4 text-[#95122C]" />
              <span>Zero-Knowledge архитектура</span>
            </div>
            <div className="hidden sm:block h-1 w-1 rounded-full bg-[#3F3C3E]" />
            <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
              <Lock className="h-4 w-4 text-[#95122C]" />
              <span>152-ФЗ compliant</span>
            </div>
            <div className="hidden sm:block h-1 w-1 rounded-full bg-[#3F3C3E]" />
            <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
              <Zap className="h-4 w-4 text-[#95122C]" />
              <span>Militarized encryption</span>
            </div>
          </motion.div>

          {/* CTA buttons with premium styling */}
          <motion.div
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
            variants={itemVariants}
          >
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 w-full sm:w-auto rounded-xl bg-[#95122C] text-white hover:bg-[#c41e3a] font-semibold text-base transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-lg shadow-[#95122C]/30"
              >
                <span className="flex items-center gap-2">
                  Начать бесплатно
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-xl border-[#3F3C3E] bg-[#2A2729]/50 px-8 text-[#F5F5F5] hover:bg-[#2A2729] hover:border-[#95122C] backdrop-blur-sm sm:w-auto font-semibold text-base transition-accent"
            >
              <Play className="mr-2 h-4 w-4" />
              <span>Смотреть демо (2 мин)</span>
            </Button>
          </motion.div>

          {/* Stats - animated */}
          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 divide-x divide-[#3F3C3E]"
            variants={itemVariants}
          >
            <motion.div
              className="text-center"
              whileInView={{ y: [20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
                50K+
              </div>
              <div className="text-sm text-[#A3A3A3] mt-2">Активных пользователей</div>
            </motion.div>
            <motion.div
              className="text-center"
              whileInView={{ y: [20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
                $2.4M
              </div>
              <div className="text-sm text-[#A3A3A3] mt-2">Сэкономлено в месяц</div>
            </motion.div>
            <motion.div
              className="text-center"
              whileInView={{ y: [20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
                4.9/5
              </div>
              <div className="text-sm text-[#A3A3A3] mt-2">Рейтинг пользователей</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero visual - dashboard mockup */}
        <motion.div
          className="mt-20 lg:mt-28"
          whileInView={{ opacity: [0, 1], y: [40, 0] }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#95122C]/10 to-transparent pointer-events-none" />
            <div className="relative bg-[#2A2729] border border-[#3F3C3E] shadow-soft-xl rounded-2xl p-8 lg:p-12">
              {/* Dashboard mockup */}
              <div className="grid grid-cols-12 gap-4 h-64 sm:h-96">
                {/* Sidebar */}
                <div className="col-span-2 bg-[#161415] rounded-xl p-4 space-y-4">
                  <div className="h-8 bg-[#95122C] rounded-lg" />
                  <div className="h-4 bg-[#3F3C3E] rounded w-2/3" />
                  <div className="h-4 bg-[#3F3C3E] rounded" />
                  <div className="h-4 bg-[#3F3C3E] rounded w-3/4" />
                </div>

                {/* Main content */}
                <div className="col-span-10 space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center pb-4 border-b border-[#3F3C3E]">
                    <div className="h-6 bg-[#3F3C3E] rounded w-1/4" />
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-[#95122C] rounded-lg" />
                      <div className="h-8 w-8 bg-[#3F3C3E] rounded-lg" />
                    </div>
                  </div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <motion.div
                      className="bg-[#3F3C3E]/30 rounded-xl p-4"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="bg-gradient-to-br from-[#95122C]/20 to-transparent rounded-xl p-4 border border-[#95122C]/30"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect around dashboard */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#95122C]/10 to-transparent rounded-2xl blur-xl -z-10" />
          </div>
        </motion.div>

        {/* CTA after hero - secondary */}
        <motion.div
          className="mt-16 text-center"
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#A3A3A3]">
            ✨ Бесплатно до первого миллиона — нет кредитной карты не требуется
          </p>
        </motion.div>
      </div>
    </section>
  )
}
