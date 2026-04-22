"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, X, FolderPlus, Zap, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const actions = [
  {
    icon: Plus,
    label: "Add Subscription",
    description: "Track a new service",
    color: "from-emerald-500 to-teal-500",
    textColor: "text-emerald-400",
  },
  {
    icon: X,
    label: "Cancel Subscription",
    description: "Stop a service",
    color: "from-rose-500 to-pink-500",
    textColor: "text-rose-400",
  },
  {
    icon: FolderPlus,
    label: "Add Asset",
    description: "Store keys & licenses",
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-400",
  },
]

export function QuickActions() {
  return (
    <Card className="glass-card border-border/50 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="ghost"
            className={cn(
              "w-full justify-between h-auto p-4 group",
              "bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/30",
              "transition-all duration-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  "bg-gradient-to-br",
                  action.color
                )}
              >
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">
                  {action.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Button>
        ))}

        {/* Pro Tip */}
        <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-medium">Pro tip:</span> Use
            keyboard shortcuts{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-secondary text-xs font-mono">
              Cmd + K
            </kbd>{" "}
            for quick access
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
