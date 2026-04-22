"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, CreditCard, Layers, Sparkles, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

const subscriptions = [
  { name: "Netflix", price: "$15.99", category: "Streaming", status: "active", color: "bg-red-500/20" },
  { name: "Spotify", price: "$9.99", category: "Music", status: "active", color: "bg-green-500/20" },
  { name: "Adobe CC", price: "$54.99", category: "Software", status: "active", color: "bg-pink-500/20" },
  { name: "Figma", price: "$12.00", category: "Design", status: "active", color: "bg-purple-500/20" },
]

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
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
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>
}

export function DashboardMockup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Outer glow effect */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-xl" />
      
      {/* Browser frame with glassmorphism */}
      <div className={`relative overflow-hidden rounded-2xl glass-card shadow-2xl shadow-primary/10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Gradient border glow */}
        <div className="absolute inset-0 rounded-2xl glow-border" />
        
        {/* Browser header */}
        <div className="relative flex items-center gap-2 border-b border-border/50 bg-secondary/20 px-5 py-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-muted-foreground/20 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/20 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/20 hover:bg-green-400 transition-colors cursor-pointer" />
          </div>
          <div className="ml-4 flex-1">
            <div className="mx-auto max-w-md rounded-lg glassmorphism px-4 py-2 text-center text-sm text-muted-foreground">
              <span className="text-primary/60">https://</span>app.coredex.io/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard content with animations */}
        <div className="relative p-8">
          {/* Animated background shimmer */}
          <div className="pointer-events-none absolute inset-0 animate-shimmer opacity-50" />
          
          <div className="relative grid gap-6 lg:grid-cols-3">
            {/* Stats cards with glassmorphism */}
            <Card className={`glass-card p-6 transition-all duration-700 hover:scale-[1.02] hover:glow-primary ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Monthly Spend</span>
                <div className="rounded-lg bg-primary/10 p-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  <AnimatedNumber value={92} prefix="$" suffix=".97" />
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex items-center rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12%
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </Card>

            <Card className={`glass-card p-6 transition-all duration-700 hover:scale-[1.02] hover:glow-primary ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Subscriptions</span>
                <div className="rounded-lg bg-accent/10 p-2">
                  <Layers className="h-4 w-4 text-accent" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  <AnimatedNumber value={12} />
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  -2
                </span>
                <span className="text-xs text-muted-foreground">optimized this month</span>
              </div>
            </Card>

            <Card className={`glass-card p-6 transition-all duration-700 hover:scale-[1.02] hover:glow-primary ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Savings Found</span>
                <div className="rounded-lg bg-primary/10 p-2 animate-pulse">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gradient">
                  <AnimatedNumber value={34} prefix="$" suffix=".00" />
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">potential monthly savings</span>
                <ArrowUpRight className="h-3 w-3 text-primary" />
              </div>
            </Card>
          </div>

          {/* Subscriptions list */}
          <Card className={`mt-8 glass-card overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
            <div className="border-b border-border/50 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recent Subscriptions</h3>
                <span className="text-xs text-primary hover:underline cursor-pointer">View all</span>
              </div>
            </div>
            <div className="divide-y divide-border/30">
              {subscriptions.map((sub, index) => (
                <div 
                  key={sub.name} 
                  className={`flex items-center justify-between p-5 transition-all duration-500 hover:bg-secondary/30 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${sub.color}`}>
                      <span className="text-lg font-semibold">{sub.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-sm text-muted-foreground">{sub.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      {sub.status}
                    </Badge>
                    <span className="font-semibold tabular-nums">{sub.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Floating accent elements */}
      <div className="pointer-events-none absolute -right-20 top-1/4 h-40 w-40 rounded-full bg-accent/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -left-16 bottom-1/4 h-32 w-32 rounded-full bg-primary/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    </div>
  )
}
