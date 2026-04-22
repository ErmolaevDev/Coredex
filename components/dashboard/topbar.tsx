"use client"

import { Search, Bell, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface DashboardTopbarProps {
  onMenuToggle: () => void
}

export function DashboardTopbar({ onMenuToggle }: DashboardTopbarProps) {
  return (
    <header className="glass-card border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions, assets..."
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </Button>

          {/* User Avatar */}
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-border/50">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <Badge variant="secondary" className="text-xs">Pro Plan</Badge>
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-primary/30">
              <AvatarImage src="/avatar.jpg" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
