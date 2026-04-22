"use client"

import { useState } from "react"
import { WelcomeStep } from "@/components/onboarding/welcome-step"
import { ConnectSourcesStep } from "@/components/onboarding/connect-sources-step"
import { ScanningStep } from "@/components/onboarding/scanning-step"
import { ResultsStep } from "@/components/onboarding/results-step"
import { PersonalizationStep } from "@/components/onboarding/personalization-step"
import { ProgressIndicator } from "@/components/onboarding/progress-indicator"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const totalSteps = 5

  const goToNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main accent glow */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(circle, #7D1D06 0%, transparent 70%)" }}
        />
        {/* Secondary glow */}
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(circle, #a52d0f 0%, transparent 70%)" }}
        />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Progress indicator - only show during main flow steps */}
      {currentStep >= 2 && currentStep <= 4 && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <ProgressIndicator currentStep={currentStep - 1} totalSteps={3} />
        </div>
      )}

      {/* Step content */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-16">
        <div 
          key={currentStep}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {currentStep === 1 && (
            <WelcomeStep onNext={goToNext} />
          )}
          {currentStep === 2 && (
            <ConnectSourcesStep 
              onNext={goToNext} 
              onBack={goToPrevious}
              selectedSource={selectedSource}
              onSelectSource={setSelectedSource}
            />
          )}
          {currentStep === 3 && (
            <ScanningStep 
              onNext={goToNext}
              source={selectedSource}
            />
          )}
          {currentStep === 4 && (
            <ResultsStep 
              onNext={goToNext}
              onBack={goToPrevious}
            />
          )}
          {currentStep === 5 && (
            <PersonalizationStep />
          )}
        </div>
      </div>

      {/* Security badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Bank-grade encryption</span>
        <span className="mx-2">|</span>
        <span>SOC 2 Certified</span>
      </div>
    </div>
  )
}
