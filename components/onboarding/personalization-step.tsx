"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check, Bell, Lightbulb, Sparkles, ArrowRight } from "lucide-react"

export function PersonalizationStep() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [savingsTips, setSavingsTips] = useState(true)
  const [isCompleting, setIsCompleting] = useState(false)

  const handleFinish = () => {
    setIsCompleting(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1200)
  }

  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent blur-2xl opacity-50 scale-150" />
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
            <Sparkles className="w-9 h-9 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
          Almost there
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-sm mx-auto">
          Customize your experience to get the most out of Coredex
        </p>
      </div>

      {/* Options */}
      <div className="w-full space-y-4 mb-12">
        <div className="flex items-center justify-between p-6 md:p-7 rounded-2xl glass-card group hover:bg-white/[0.04] transition-all">
          <div className="flex items-center gap-5">
            <div className="w-13 h-13 rounded-xl bg-primary/15 flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg">Renewal alerts</p>
              <p className="text-sm text-muted-foreground">Get notified 3 days before any subscription renews</p>
            </div>
          </div>
          <Switch 
            checked={notifications} 
            onCheckedChange={setNotifications}
            className="scale-110"
          />
        </div>

        <div className="flex items-center justify-between p-6 md:p-7 rounded-2xl glass-card group hover:bg-white/[0.04] transition-all">
          <div className="flex items-center gap-5">
            <div className="w-13 h-13 rounded-xl bg-accent/15 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-lg">Smart suggestions</p>
              <p className="text-sm text-muted-foreground">Receive personalized tips to optimize your spending</p>
            </div>
          </div>
          <Switch 
            checked={savingsTips} 
            onCheckedChange={setSavingsTips}
            className="scale-110"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="w-full p-6 md:p-7 rounded-2xl glass-card mb-12">
        <h3 className="font-semibold text-lg mb-5">{"You're all set"}</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-muted-foreground">12 subscriptions imported</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-muted-foreground">$186.66/mo tracked</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-muted-foreground">3 saving opportunities identified</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button 
        onClick={handleFinish}
        disabled={isCompleting}
        size="lg"
        className="w-full py-7 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-xl shadow-primary/25 disabled:opacity-80"
      >
        {isCompleting ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Setting up your dashboard...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </div>
        )}
      </Button>
    </div>
  )
}
