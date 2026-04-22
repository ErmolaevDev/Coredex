"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Mail, Building2, PlusCircle, Zap } from "lucide-react"

interface ConnectSourcesStepProps {
  onNext: () => void
  onBack: () => void
  selectedSource: string | null
  onSelectSource: (source: string) => void
}

const sources = [
  {
    id: "email",
    icon: Mail,
    title: "Connect Email",
    description: "Auto-detect subscriptions from receipts",
    badge: "Fastest",
    badgeIcon: Zap,
  },
  {
    id: "bank",
    icon: Building2,
    title: "Connect Bank",
    description: "Find all recurring transactions",
    badge: null,
    badgeIcon: null,
  },
  {
    id: "manual",
    icon: PlusCircle,
    title: "Add Manually",
    description: "Enter subscriptions yourself",
    badge: null,
    badgeIcon: null,
  },
]

export function ConnectSourcesStep({ 
  onNext, 
  onBack, 
  selectedSource, 
  onSelectSource 
}: ConnectSourcesStepProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
          How should we find your subscriptions?
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
          Choose your preferred method. You can add more sources later.
        </p>
      </div>

      {/* Source cards */}
      <div className="w-full space-y-4 mb-14">
        {sources.map((source) => {
          const Icon = source.icon
          const BadgeIcon = source.badgeIcon
          const isSelected = selectedSource === source.id

          return (
            <button
              key={source.id}
              onClick={() => onSelectSource(source.id)}
              className={`
                relative w-full p-6 md:p-7 rounded-2xl text-left transition-all duration-300
                ${isSelected 
                  ? "bg-primary/10 ring-2 ring-primary shadow-lg shadow-primary/10" 
                  : "glass-card hover:bg-white/[0.04]"
                }
              `}
            >
              {source.badge && (
                <div className="absolute -top-3 left-6 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold text-primary-foreground flex items-center gap-1.5 shadow-lg">
                  {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                  {source.badge}
                </div>
              )}
              
              <div className="flex items-center gap-5">
                <div className={`
                  w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0
                  ${isSelected 
                    ? "bg-gradient-to-br from-primary to-accent shadow-lg" 
                    : "bg-secondary"
                  }
                `}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-primary-foreground" : "text-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1">{source.title}</h3>
                  <p className="text-sm text-muted-foreground">{source.description}</p>
                </div>
                <div className={`
                  w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center shrink-0
                  ${isSelected 
                    ? "border-primary bg-primary" 
                    : "border-muted-foreground/40"
                  }
                `}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 w-full">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={!selectedSource}
          className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary/20 disabled:shadow-none"
        >
          Continue
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
