"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingDown, Calendar, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const insights = [
  {
    type: "unused",
    icon: AlertTriangle,
    title: "Adobe CC unused for 3 weeks",
    description: "You haven't opened Adobe apps recently. Consider pausing or canceling.",
    savings: "$22.99/mo",
    action: "Review subscription",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    type: "switch",
    icon: TrendingDown,
    title: "Switch Netflix to yearly plan",
    description: "Save 20% by switching from monthly to annual billing.",
    savings: "$31/year",
    action: "Switch plan",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    type: "upcoming",
    icon: Calendar,
    title: "3 renewals this week",
    description: "Spotify, Figma, and Netflix are renewing soon.",
    savings: "$37.98 total",
    action: "View details",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    type: "tip",
    icon: Lightbulb,
    title: "Family plan available",
    description: "Share Spotify with family members and save $5/mo each.",
    savings: "$25/mo potential",
    action: "Upgrade now",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function SavingsInsights() {
  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Savings Insights
          </CardTitle>
          <span className="text-sm text-primary font-medium">$18/mo potential</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className={cn(
              "p-4 rounded-xl border border-border/30 transition-all duration-200",
              "hover:border-primary/30 hover:bg-secondary/30 group cursor-pointer"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  insight.bgColor
                )}
              >
                <insight.icon className={cn("h-5 w-5", insight.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {insight.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {insight.description}
                    </p>
                  </div>
                  <span className={cn("text-sm font-semibold whitespace-nowrap", insight.color)}>
                    {insight.savings}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-7 px-3 text-xs text-primary hover:text-primary hover:bg-primary/10"
                >
                  {insight.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
