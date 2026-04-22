"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, Vault, PieChart, Users, Bell, ArrowRight } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Subscription tracking",
    description: "Automatically detect and track all your recurring payments in one dashboard.",
  },
  {
    icon: Vault,
    title: "Digital asset vault",
    description: "Securely store licenses, API keys, and important digital documents.",
  },
  {
    icon: PieChart,
    title: "Spending analytics",
    description: "Visualize your digital spending with detailed breakdowns and trends.",
  },
  {
    icon: Users,
    title: "Family sharing",
    description: "Share subscriptions and manage access across family members.",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    description: "Get alerts for renewals, price changes, and optimization opportunities.",
  },
]

export function Solution() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">The Solution</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            One place for{" "}
            <span className="text-gradient">everything digital</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Coredex brings all your digital assets under one roof with powerful management tools.
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`group glass-card p-8 transition-all duration-300 hover:scale-[1.02] hover:glow-primary ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              <div className="mt-6 flex items-center text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
