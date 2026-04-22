"use client"

import { motion } from "framer-motion"
import { Users, Briefcase, Home, Heart } from "lucide-react"

const audiences = [
  {
    title: "Для профессионалов",
    description: "Управляйте подписками, лицензиями и API-ключами в одном месте",
    icon: Briefcase,
    features: ["SaaS subscriptions", "Development tools", "API management"],
    gradient: "from-[#95122C]/20 to-transparent",
  },
  {
    title: "Для семей",
    description: "Разделяйте доступ, контролируйте расходы, учите детей финансовой грамотности",
    icon: Users,
    features: ["Family sharing", "Expense tracking", "Parental controls"],
    gradient: "from-[#c41e3a]/20 to-transparent",
  },
  {
    title: "Для умный дом",
    description: "Управляйте устройствами, подписками и подключениями умного дома",
    icon: Home,
    features: ["Device management", "Connected services", "Automations"],
    gradient: "from-[#d6417e]/20 to-transparent",
  },
  {
    title: "Для цифрового наследия",
    description: "Сохраняйте важные данные и доступы для наследников",
    icon: Heart,
    features: ["Legacy planning", "Secure storage", "Access delegation"],
    gradient: "from-[#e868a2]/20 to-transparent",
  },
]

export function ForWhom() {
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
    <section className="relative py-24 lg:py-32 bg-[#161415] overflow-hidden">
      {/* Background effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#95122C]/5 blur-[100px]" />
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
          <p className="text-sm font-semibold text-[#95122C] uppercase tracking-wide">Для кого это</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#F5F5F5] leading-tight">
            Coredex полезен каждому
          </h2>
          <p className="mt-6 text-lg text-[#A3A3A3]">
            От профессионалов до семей — управляйте всеми цифровыми активами в одном защищённом месте
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {audiences.map((audience, index) => {
            const Icon = audience.icon
            return (
              <motion.div
                key={audience.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl p-8 border border-[#3F3C3E] bg-gradient-to-br ${audience.gradient} 
                    backdrop-blur-sm transition-all duration-300 hover:border-[#95122C]/50 hover:shadow-soft-lg`}
                >
                  {/* Icon background */}
                  <div className="absolute -top-8 -right-8 w-20 h-20 bg-[#95122C]/10 rounded-full blur-2xl" />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      className="mb-4 inline-flex p-3 rounded-xl bg-[#95122C]/20"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className="h-6 w-6 text-[#95122C]" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">
                      {audience.title}
                    </h3>

                    <p className="text-[#A3A3A3] mb-6 leading-relaxed">
                      {audience.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2">
                      {audience.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-[#C8C5C7]">
                          <span className="flex h-1.5 w-1.5 rounded-full bg-[#95122C]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
