"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#features", label: "Для кого" },
    { href: "#benefits", label: "Преимущества" },
    { href: "#how-it-works", label: "Как это работает" },
    { href: "#pricing", label: "Тарифы" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#161415]/90 backdrop-blur-md border-b border-[#3F3C3E]/50 shadow-soft-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#95122C] to-[#c41e3a] glow-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock className="h-6 w-6 text-white" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-[#F5F5F5] group-hover:text-[#95122C] transition-colors">
            Coredex
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-[#A3A3A3] transition-colors hover:text-[#F5F5F5] rounded-lg hover:bg-[#2A2729]/50"
              whileHover={{ color: "#F5F5F5" }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/auth/sign-in">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#2A2729]/50"
            >
              Войти
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              size="sm"
              className="bg-[#95122C] text-white hover:bg-[#c41e3a] rounded-lg px-4 font-semibold transition-all shadow-lg shadow-[#95122C]/30 hover:shadow-[#95122C]/50"
            >
              <span className="flex items-center gap-1">
                Начать бесплатно
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A2729] border border-[#3F3C3E] md:hidden text-[#F5F5F5]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden"
      >
        <div className="border-t border-[#3F3C3E]/50 bg-[#161415] px-6 py-6 space-y-4">
          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-2 space-y-2 border-b border-[#3F3C3E]/50 pb-6">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm text-[#A3A3A3] transition-colors hover:text-[#F5F5F5] rounded-lg hover:bg-[#2A2729]/50 block"
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ x: 4 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/auth/sign-in" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#2A2729]/50 justify-start"
              >
                Войти
              </Button>
            </Link>
            <Link href="/auth/register" className="w-full">
              <Button
                size="sm"
                className="w-full bg-[#95122C] text-white hover:bg-[#c41e3a] font-semibold"
              >
                Начать бесплатно
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
