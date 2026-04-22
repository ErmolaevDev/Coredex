"use client"

import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { Subscription } from "@/lib/api"

const palette = [
  "bg-red-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-rose-600",
  "bg-zinc-100 text-zinc-900",
  "bg-zinc-800",
  "bg-[#4A154B]",
  "bg-blue-500",
]

function initialIcon(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?"
}

export type SubscriptionsListProps = {
  subscriptions: Subscription[]
  loading?: boolean
}

export function SubscriptionsList({
  subscriptions,
  loading = false,
}: SubscriptionsListProps) {
  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Subscriptions
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {loading ? "…" : `${subscriptions.length} total`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="space-y-1 px-6 pb-6">
            {loading ? (
              <div className="space-y-3 py-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : subscriptions.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No subscriptions yet. Add one via the API or future UI.
              </p>
            ) : (
              subscriptions.map((sub, index) => {
                const color = palette[sub.id % palette.length]
                const darkText = color.includes("zinc-100")
                const next = sub.next_billing_date
                  ? format(new Date(sub.next_billing_date), "MMM d")
                  : "—"
                const isActive = sub.status === "active"
                return (
                  <div
                    key={sub.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                      "hover:bg-secondary/50 group cursor-pointer",
                      index === 0 && "bg-secondary/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
                          color,
                          darkText ? "text-zinc-900" : "text-white"
                        )}
                      >
                        {initialIcon(sub.name)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{sub.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Bills on {next} · {sub.billing_cycle}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="font-semibold text-foreground">
                          ${sub.price.toFixed(2)}
                        </p>
                        <Badge
                          variant={isActive ? "default" : "destructive"}
                          className={cn(
                            "text-xs capitalize",
                            isActive
                              ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                          )}
                        >
                          {sub.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
