"use client"

import { useEffect, useState, useCallback } from "react"
import { Check, Zap } from "lucide-react"

interface ScanningStepProps {
  onNext: () => void
  source: string | null
}

const detectedServices = [
  { id: 1, name: "Netflix", icon: "N", color: "#E50914", price: 15.99 },
  { id: 2, name: "Spotify", icon: "S", color: "#1DB954", price: 9.99 },
  { id: 3, name: "Figma", icon: "F", color: "#A259FF", price: 12.00 },
  { id: 4, name: "Adobe CC", icon: "Ai", color: "#FF0000", price: 54.99 },
  { id: 5, name: "Notion", icon: "N", color: "#FFFFFF", price: 8.00 },
  { id: 6, name: "GitHub", icon: "G", color: "#8B5CF6", price: 4.00 },
  { id: 7, name: "Slack", icon: "S", color: "#4A154B", price: 7.25 },
  { id: 8, name: "AWS", icon: "A", color: "#FF9900", price: 23.45 },
  { id: 9, name: "Vercel", icon: "V", color: "#000000", price: 20.00 },
  { id: 10, name: "Linear", icon: "L", color: "#5E6AD2", price: 8.00 },
  { id: 11, name: "ChatGPT", icon: "C", color: "#10A37F", price: 20.00 },
  { id: 12, name: "iCloud", icon: "i", color: "#3693F3", price: 2.99 },
]

export function ScanningStep({ onNext, source }: ScanningStepProps) {
  const [progress, setProgress] = useState(0)
  const [visibleServices, setVisibleServices] = useState<typeof detectedServices>([])
  const [totalFound, setTotalFound] = useState(0)
  const [totalSpending, setTotalSpending] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [scanPhase, setScanPhase] = useState<"connecting" | "scanning" | "analyzing" | "complete">("connecting")

  const handleNext = useCallback(() => {
    onNext()
  }, [onNext])

  useEffect(() => {
    // Phase transitions
    const phaseTimings = [
      { phase: "scanning" as const, delay: 1200 },
      { phase: "analyzing" as const, delay: 3500 },
      { phase: "complete" as const, delay: 5000 },
    ]

    const phaseTimeouts = phaseTimings.map(({ phase, delay }) => 
      setTimeout(() => setScanPhase(phase), delay)
    )

    // Progress animation with easing
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Slow down near the end for drama
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1
        return Math.min(prev + increment, 100)
      })
    }, 80)

    // Show services one by one with stagger
    detectedServices.forEach((service, index) => {
      setTimeout(() => {
        setVisibleServices((prev) => [...prev, service])
        setTotalFound(index + 1)
        setTotalSpending((prev) => prev + service.price)
      }, 1500 + index * 280)
    })

    // Complete and move to next step
    const completeTimeout = setTimeout(() => {
      setIsComplete(true)
      setTimeout(handleNext, 1200)
    }, 5500)

    return () => {
      phaseTimeouts.forEach(clearTimeout)
      clearInterval(progressInterval)
      clearTimeout(completeTimeout)
    }
  }, [handleNext])

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      {/* Animated Scanner Visual */}
      <div className="relative w-40 h-40 mb-10">
        {/* Outer pulse rings */}
        <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-ring" />
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: "1s" }} />
        
        {/* Radar sweep */}
        <div className="absolute inset-4 rounded-full overflow-hidden">
          <div 
            className="absolute inset-0 animate-radar"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, var(--primary) 30deg, transparent 60deg)`,
              opacity: 0.4,
            }}
          />
        </div>

        {/* Center orb */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-xl opacity-60" />
          {isComplete ? (
            <Check className="w-10 h-10 text-primary-foreground animate-success-pop relative z-10" />
          ) : (
            <Zap className="w-10 h-10 text-primary-foreground animate-pulse relative z-10" />
          )}
        </div>

        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5"
            style={{
              animation: `orbit ${6 + i}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <div className="w-full h-full rounded-full bg-primary shadow-lg shadow-primary/50" />
          </div>
        ))}
      </div>

      {/* Status text */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {scanPhase === "connecting" && "Connecting securely..."}
          {scanPhase === "scanning" && "Discovering subscriptions..."}
          {scanPhase === "analyzing" && "Analyzing your spending..."}
          {scanPhase === "complete" && "Scan complete!"}
        </h2>
        <p className="text-muted-foreground text-lg">
          {source === "email" && "Scanning email receipts with bank-grade encryption"}
          {source === "bank" && "Analyzing transaction patterns securely"}
          {source === "manual" && "Preparing your personalized dashboard"}
          {!source && "Discovering your digital subscriptions"}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 animate-shimmer"
            style={{ 
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-mono font-semibold text-primary">{progress}%</span>
        </div>
      </div>

      {/* Live stats */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary animate-number-tick">{totalFound}</div>
          <div className="text-sm text-muted-foreground mt-1">Subscriptions Found</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-foreground animate-number-tick">
            ${totalSpending.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Monthly Total</div>
        </div>
      </div>

      {/* Detected services stream */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">Live Feed</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Scanning
          </span>
        </div>
        <div className="space-y-2 max-h-[200px] overflow-hidden relative">
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
          
          {visibleServices.slice(-5).map((service, index) => (
            <div
              key={service.id}
              className="flex items-center gap-3 p-3 rounded-lg glass-card animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg"
                style={{ 
                  backgroundColor: service.color,
                  color: service.color === "#FFFFFF" || service.color === "#000000" 
                    ? (service.color === "#FFFFFF" ? "#000" : "#FFF")
                    : "#FFF"
                }}
              >
                {service.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{service.name}</p>
                <p className="text-xs text-muted-foreground">${service.price.toFixed(2)}/mo</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-success-pop">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
