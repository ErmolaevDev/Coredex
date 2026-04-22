"use client"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

const stepLabels = ["Connect", "Scan", "Review"]

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div key={index} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  relative flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold
                  transition-all duration-500
                  ${isCompleted 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                    : isActive 
                      ? "bg-primary/20 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background" 
                      : "bg-secondary text-muted-foreground"
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                {stepLabels[index]}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`
                  w-16 h-0.5 mb-5 rounded-full transition-all duration-500
                  ${isCompleted ? "bg-primary" : "bg-secondary"}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
