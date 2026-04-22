"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Share2, UserCheck, Settings, Plus } from "lucide-react"

const familyMembers = [
  { name: "You", role: "Admin", avatar: "Y", subscriptions: 8, color: "bg-primary/20" },
  { name: "Partner", role: "Member", avatar: "P", subscriptions: 4, color: "bg-accent/20" },
  { name: "Teen", role: "Limited", avatar: "T", subscriptions: 2, color: "bg-chart-4/20" },
]

export function Family() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          {/* Family members visualization */}
          <div className="order-2 lg:order-1">
            <Card className="glass-card p-8 overflow-hidden">
              {/* Shimmer effect */}
              <div className="pointer-events-none absolute inset-0 animate-shimmer opacity-30" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-semibold">Family Members</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    3 of 5 seats
                  </Badge>
                </div>

                <div className="space-y-4">
                  {familyMembers.map((member, index) => (
                    <div
                      key={member.name}
                      className="flex items-center justify-between rounded-xl glass-card p-5 transition-all duration-300 hover:scale-[1.01]"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${member.color} font-semibold text-lg`}>
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.subscriptions} subscriptions</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-border/50 bg-secondary/30">
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                  
                  {/* Add member button */}
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 p-5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                    <Plus className="h-5 w-5" />
                    <span className="font-medium">Add family member</span>
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Card className="glass-card p-5 text-center transition-all duration-300 hover:scale-[1.02]">
                    <Share2 className="mx-auto h-6 w-6 text-primary mb-3" />
                    <p className="text-xl font-bold">4</p>
                    <p className="text-sm text-muted-foreground">Shared subscriptions</p>
                  </Card>
                  <Card className="glass-card p-5 text-center transition-all duration-300 hover:scale-[1.02]">
                    <Settings className="mx-auto h-6 w-6 text-primary mb-3" />
                    <p className="text-xl font-bold text-gradient">$32</p>
                    <p className="text-sm text-muted-foreground">Saved monthly</p>
                  </Card>
                </div>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full glassmorphism px-4 py-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Family Plan</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              Built for{" "}
              <span className="text-gradient">families</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Share subscriptions, manage access controls, and see combined spending across all family members.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Share2,
                  title: "Shared subscriptions",
                  description: "See which services can be shared and avoid duplicate payments.",
                },
                {
                  icon: UserCheck,
                  title: "Access controls",
                  description: "Set permissions for each family member based on their needs.",
                },
                {
                  icon: Settings,
                  title: "Unified management",
                  description: "Manage all family subscriptions from a single dashboard.",
                },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-5 p-4 rounded-xl transition-colors hover:bg-secondary/30">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="mt-1 text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
