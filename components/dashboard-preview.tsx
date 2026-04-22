import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, DollarSign, Layers, Lightbulb } from "lucide-react"

export function DashboardPreview() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">Dashboard Preview</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Everything at a glance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A beautiful, intuitive dashboard that gives you instant visibility into your digital life.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Monthly Spend Card */}
          <Card className="border-border bg-card p-6 transition-all hover:border-primary/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Monthly Spend</span>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">$127</span>
              <span className="text-lg text-muted-foreground">.94</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <TrendingDown className="mr-1 h-3 w-3" />
                -8.3%
              </Badge>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
            {/* Mini chart */}
            <div className="mt-6 flex items-end gap-1 h-16">
              {[40, 60, 35, 80, 50, 70, 45, 90, 55, 75, 40, 65].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-primary/30 transition-all hover:bg-primary"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </Card>

          {/* Active Subscriptions Card */}
          <Card className="border-border bg-card p-6 transition-all hover:border-primary/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Active Subscriptions</span>
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <div className="text-4xl font-bold">14</div>
            <p className="mt-2 text-sm text-muted-foreground">across 6 categories</p>
            
            <div className="mt-6 space-y-3">
              {[
                { name: "Entertainment", count: 5, color: "bg-primary" },
                { name: "Productivity", count: 4, color: "bg-accent" },
                { name: "Cloud Storage", count: 3, color: "bg-chart-3" },
                { name: "Other", count: 2, color: "bg-muted-foreground" },
              ].map((cat) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${cat.color}`} />
                  <span className="flex-1 text-sm">{cat.name}</span>
                  <span className="text-sm text-muted-foreground">{cat.count}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Savings Suggestions Card */}
          <Card className="border-border bg-gradient-to-br from-primary/10 to-accent/10 p-6 transition-all hover:border-primary/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Savings Opportunities</span>
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">$48</span>
              <span className="text-lg text-primary/70">/mo</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">potential savings found</p>
            
            <div className="mt-6 space-y-3">
              <div className="rounded-lg bg-background/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Duplicate streaming</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">$24/mo</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">You have 3 video streaming services</p>
              </div>
              <div className="rounded-lg bg-background/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Unused service</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">$14/mo</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">No activity in 90 days</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
