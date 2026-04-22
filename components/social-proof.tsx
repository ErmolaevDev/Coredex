"use client"

import { motion } from "framer-motion"
import { Shield, Lock, CheckCircle, Zap } from "lucide-react"

export function SocialProof() {
  const badges = [
    { icon: Shield, label: "Zero-Knowledge" },
    { icon: Lock, label: "152-ФЗ Compliant" },
    { icon: CheckCircle, label: "ISO 27001" },
    { icon: Zap, label: "Military Encryption" },
  ]

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden bg-[#161415] border-y border-[#3F3C3E]/50">
      <div className="mx-auto max-w-7xl px-6">
        {/* Security badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.label}
                variants={itemVariants}
                className="flex items-center gap-2 rounded-full bg-[#2A2729] border border-[#3F3C3E] px-5 py-2.5 hover:border-[#95122C]/50 transition-all"
              >
                <Icon className="h-4 w-4 text-[#95122C]" />
                <span className="text-sm font-medium text-[#A3A3A3]">{badge.label}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust message */}
        <motion.p
          className="text-center text-sm text-[#A3A3A3] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Доверяют 50,000+ пользователей в 180+ странах
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-2xl font-bold text-[#95122C]">50K+</div>
            <div className="text-xs text-[#A3A3A3] mt-1">Активных пользователей</div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-[#3F3C3E]/50" />
          <div>
            <div className="text-2xl font-bold text-[#95122C]">180+</div>
            <div className="text-xs text-[#A3A3A3] mt-1">Стран по всему миру</div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-[#3F3C3E]/50" />
          <div>
            <div className="text-2xl font-bold text-[#95122C]">99.99%</div>
            <div className="text-xs text-[#A3A3A3] mt-1">Uptime гарантия</div>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
