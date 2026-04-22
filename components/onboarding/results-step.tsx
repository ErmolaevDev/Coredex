"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Edit3, TrendingUp, CreditCard, Layers, Sparkles } from "lucide-react"

interface ResultsStepProps {
  onNext: () => void
  onBack: () => void
}

const detectedServices = [
  { name: "Netflix", icon: "N", color: "#E50914", price: 15.99 },
  { name: "Spotify", icon: "S", color: "#1DB954", price: 9.99 },
  { name: "Figma", icon: "F", color: "#A259FF", price: 12.00 },
  { name: "Adobe CC", icon: "Ai", color: "#FF0000", price: 54.99 },
  { name: "Notion", icon: "N", color: "#FFFFFF", price: 8.00 },
  { name: "GitHub", icon: "G", color: "#8B5CF6", price: 4.00 },
  { name: "Slack", icon: "S", color: "#4A154B", price: 7.25 },
  { name: "AWS", icon: "A", color: "#FF9900", price: 23.45 },
  { name: "Vercel", icon: "V", color: "#000000", price: 20.00 },
  { name: "Linear", icon: "L", color: "#5E6AD2", price: 8.00 },
  { name: "ChatGPT", icon: "C", color: "#10A37F", price: 20.00 },
  { name: "iCloud", icon: "i", color: "#3693F3", price: 2.99 },
]

const totalMonthly = detectedServices.reduce((sum, s) => sum + s.price, 0)

export function ResultsStep({ onNext }: ResultsStepProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Header with celebration */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6 animate-in fade-in zoom-in duration-500">
          <Sparkles className="w-4 h-4" />
          Scan Complete
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
          We found everything
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl">
          {"Here's what we discovered in your accounts"}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-5 w-full mb-10">
        <div className="p-6 md:p-7 rounded-2xl glass-card relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-4xl font-bold mb-1">{detectedServices.length}</p>
            <p className="text-sm text-muted-foreground">Active subscriptions</p>
          </div>
        </div>
        <div className="p-6 md:p-7 rounded-2xl glass-card relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-4xl font-bold mb-1">${totalMonthly.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Monthly spend</p>
          </div>
        </div>
      </div>

      {/* Service cards grid */}
      <div className="w-full mb-10">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium text-muted-foreground">Detected services</p>
          <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors">
            <Edit3 className="w-3.5 h-3.5" />
            Edit list
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {detectedServices.map((service, index) => (
            <div
              key={service.name}
              className="group relative aspect-square rounded-xl glass-card flex items-center justify-center hover:bg-white/[0.06] transition-all cursor-pointer animate-in fade-in zoom-in duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
              title={`${service.name} - $${service.price}/mo`}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-110 shadow-lg"
                style={{ 
                  backgroundColor: service.color,
                  color: service.color === "#FFFFFF" || service.color === "#000000" 
                    ? (service.color === "#FFFFFF" ? "#000" : "#FFF")
                    : "#FFF"
                }}
              >
                {service.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings hint */}
      <div className="w-full p-5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">We found potential savings</p>
            <p className="text-sm text-muted-foreground">3 subscriptions you might want to review for optimization</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button 
        onClick={onNext}
        size="lg"
        className="w-full py-7 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-xl shadow-primary/25"
      >
        Continue
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  )
}
