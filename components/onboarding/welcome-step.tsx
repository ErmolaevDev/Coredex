"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Logo with premium glow */}
      <div className="relative mb-16">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
          <span className="text-4xl font-bold text-primary-foreground">C</span>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent blur-3xl opacity-40 scale-150" />
      </div>

      {/* Headline with premium typography */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-balance leading-[1.1]">
        <span className="text-gradient">Take control</span>
        <br />
        <span className="text-foreground">of your digital life</span>
      </h1>

      {/* Subheadline */}
      <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-md leading-relaxed">
        Set up your Coredex in under 60 seconds. No credit card required.
      </p>

      {/* CTA Button */}
      <Button 
        onClick={onNext}
        size="lg"
        className="group relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-xl shadow-primary/25 hover:shadow-primary/40"
      >
        Get Started
        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
      </Button>

      {/* Trust indicators */}
      <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Free forever plan</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  )
}
