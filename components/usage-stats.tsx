"use client"

import { useEffect, useState, useRef } from "react"
import { TrendingUp, Users, DollarSign, Shield, Globe, Clock } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Active Users",
    description: "Trust Coredex daily",
  },
  {
    icon: DollarSign,
    value: 2400000,
    prefix: "$",
    label: "Saved Monthly",
    description: "By our community",
  },
  {
    icon: Shield,
    value: 99.99,
    suffix: "%",
    label: "Uptime",
    description: "Enterprise reliability",
  },
  {
    icon: Globe,
    value: 120,
    suffix: "+",
    label: "Countries",
    description: "Worldwide coverage",
  },
]

function AnimatedStat({ value, prefix = "", suffix = "", isVisible }: { value: number; prefix?: string; suffix?: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(value % 1 === 0 ? Math.floor(current) : parseFloat(current.toFixed(2)))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, isVisible])

  const formattedValue = value >= 1000000 
    ? `${(displayValue / 1000000).toFixed(1)}M` 
    : value >= 1000 
    ? `${(displayValue / 1000).toFixed(0)}K`
    : displayValue.toLocaleString()

  return <span>{prefix}{formattedValue}{suffix}</span>
}

export function UsageStats() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">By the Numbers</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            Trusted by users worldwide
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Join a growing community of people taking control of their digital subscriptions.
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`glass-card rounded-2xl p-8 text-center transition-all duration-700 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold tracking-tight text-gradient">
                <AnimatedStat 
                  value={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="mt-2 font-semibold">{stat.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
