"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, CreditCard, AlertCircle, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export type OverviewCardsProps = {
  monthlySpend?: number
  activeSubscriptions?: number
  unusedSubscriptions?: number
  loading?: boolean
  error?: string | null
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {prefix}
      {displayValue.toFixed(value % 1 !== 0 ? 2 : 0)}
      {suffix}
    </span>
  )
}

export function OverviewCards({
  monthlySpend = 0,
  activeSubscriptions = 0,
  unusedSubscriptions = 0,
  loading = false,
  error = null,
}: OverviewCardsProps) {
  const stats = [
    {
      label: "Monthly Spending",
      value: monthlySpend,
      prefix: "$",
      suffix: "",
      change: loading ? "…" : "From active subs",
      changeType: "neutral" as const,
      icon: DollarSign,
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400",
      useAnimated: true,
    },
    {
      label: "Active Subscriptions",
      value: activeSubscriptions,
      prefix: "",
      suffix: "",
      change: loading ? "…" : "Synced from API",
      changeType: "neutral" as const,
      icon: CreditCard,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      useAnimated: true,
    },
    {
      label: "Unused Subscriptions",
      value: unusedSubscriptions,
      prefix: "",
      suffix: "",
      change: unusedSubscriptions > 0 ? "Review to save" : "All clear",
      changeType: unusedSubscriptions > 0 ? ("negative" as const) : ("positive" as const),
      icon: AlertCircle,
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      useAnimated: true,
    },
    {
      label: "Potential Savings",
      value: 0,
      prefix: "",
      suffix: "",
      change: "Insights coming soon",
      changeType: "neutral" as const,
      icon: TrendingDown,
      gradient: "from-primary/20 to-accent/20",
      iconColor: "text-primary",
      useAnimated: false,
      placeholder: true,
    },
  ]

  return (
    <div className="space-y-4">
      {error ? (
        <div
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="relative glass-card border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {loading ? (
                      <Skeleton className="h-9 w-28" />
                    ) : stat.placeholder ? (
                      <span className="text-muted-foreground">—</span>
                    ) : stat.useAnimated ? (
                      <AnimatedNumber
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    ) : (
                      <span>
                        {stat.prefix}
                        {stat.value}
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                  <p
                    className={cn(
                      "text-xs font-medium",
                      stat.changeType === "positive" && "text-emerald-400",
                      stat.changeType === "negative" && "text-amber-400",
                      stat.changeType === "neutral" && "text-muted-foreground"
                    )}
                  >
                    {stat.change}
                  </p>
                </div>
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                    stat.gradient
                  )}
                >
                  <stat.icon className={cn("h-6 w-6", stat.iconColor)} />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
