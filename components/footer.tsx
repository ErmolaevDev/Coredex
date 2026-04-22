"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Twitter, Github, Linkedin, Mail, Lock } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Security", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "Help Center", "Community", "Status", "API"],
  Legal: ["Privacy", "Terms", "Cookie Policy", "GDPR", "Security Policy"],
}

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function Footer() {
  return (
    <footer className="relative border-t border-[#3F3C3E]/50 bg-[#161415] py-20 overflow-hidden mt-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#95122C]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="grid gap-12 lg:grid-cols-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand column */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#95122C] to-[#c41e3a] group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#F5F5F5]">
                Coredex
              </span>
            </Link>
            <p className="max-w-xs text-[#A3A3A3] leading-relaxed">
              Управляйте всеми цифровыми активами в одном защищённом месте. Подписки, лицензии, API-ключи, умный дом и цифровое наследие.
            </p>

            {/* Social links */}
            <div className="mt-8 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A2729] border border-[#3F3C3E] text-[#A3A3A3] transition-all hover:text-[#95122C] hover:border-[#95122C]/50"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="mb-6 text-sm font-semibold text-[#F5F5F5] uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#A3A3A3] transition-colors hover:text-[#95122C]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="my-12 bg-[#3F3C3E]/30" />

        {/* Bottom section */}
        <motion.div
          className="flex flex-col items-center justify-between gap-6 sm:flex-row"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#A3A3A3]">
            © {new Date().getFullYear()} Coredex. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-[#A3A3A3] transition-colors hover:text-[#95122C]">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-[#A3A3A3] transition-colors hover:text-[#95122C]">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-[#A3A3A3] transition-colors hover:text-[#95122C]">
              Cookies
            </a>
          </div>
        </motion.div>

        {/* Compliance badges */}
        <motion.div
          className="mt-12 pt-12 border-t border-[#3F3C3E]/30 flex flex-wrap items-center justify-center gap-6 text-xs text-[#A3A3A3]"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-[#95122C]/20" />
            <span>Zero-Knowledge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-[#95122C]/20" />
            <span>152-ФЗ Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-[#95122C]/20" />
            <span>ISO 27001</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-[#95122C]/20" />
            <span>SSL Encrypted</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
