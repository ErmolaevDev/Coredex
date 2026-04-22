"use client"

import { Card } from "@/components/ui/card"
import { CreditCard, Eye, Key, AlertCircle } from "lucide-react"

const painPoints = [
  {
    icon: CreditCard,
    title: "Too many subscriptions",
    description: "Juggling dozens of recurring payments across different platforms with no central view.",
  },
  {
    icon: AlertCircle,
    title: "Forgotten payments",
    description: "Unexpected charges for services you no longer use or forgot you signed up for.",
  },
  {
    icon: Key,
    title: "Lost licenses and access",
    description: "Software keys and account credentials scattered across emails and sticky notes.",
  },
  {
    icon: Eye,
    title: "No visibility on spending",
    description: "No clear picture of how much you're actually spending on digital services.",
  },
]

export function Problem() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-destructive/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            Your digital life is{" "}
            <span className="text-destructive">scattered</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            The average person manages 12+ subscriptions and countless digital assets with no unified system.
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((point, index) => (
            <Card
              key={point.title}
              className="group glass-card p-8 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
                <point.icon className="h-7 w-7 text-destructive" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">{point.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{point.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
