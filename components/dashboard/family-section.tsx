"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const familyMembers = [
  {
    name: "John Doe",
    role: "Admin",
    avatar: "JD",
    subscriptions: ["Netflix", "Spotify", "Figma"],
    spending: 37.98,
  },
  {
    name: "Sarah Doe",
    role: "Member",
    avatar: "SD",
    subscriptions: ["Netflix", "Spotify"],
    spending: 22.98,
  },
  {
    name: "Mike Doe",
    role: "Member",
    avatar: "MD",
    subscriptions: ["Netflix"],
    spending: 12.99,
  },
]

const sharedSubscriptions = [
  { name: "Netflix", members: 3, color: "bg-red-500" },
  { name: "Spotify", members: 2, color: "bg-green-500" },
  { name: "Figma", members: 1, color: "bg-purple-500" },
]

export function FamilySection() {
  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Family Sharing
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8 text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Family Members */}
        <div className="space-y-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Members
          </span>
          <div className="space-y-2">
            {familyMembers.map((member) => (
              <div
                key={member.name}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src={`/${member.avatar.toLowerCase()}.jpg`} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/50 to-accent/50 text-foreground text-sm">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {member.subscriptions.length} shared services
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    ${member.spending.toFixed(2)}
                  </p>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      member.role === "Admin"
                        ? "bg-primary/20 text-primary"
                        : ""
                    )}
                  >
                    {member.role}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Subscriptions */}
        <div className="space-y-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Shared Subscriptions
          </span>
          <div className="flex flex-wrap gap-2">
            {sharedSubscriptions.map((sub) => (
              <div
                key={sub.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
              >
                <div className={cn("w-3 h-3 rounded-full", sub.color)} />
                <span className="text-sm font-medium text-foreground">
                  {sub.name}
                </span>
                <Badge variant="secondary" className="text-xs h-5 px-1.5">
                  {sub.members}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
