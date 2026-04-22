"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CreditCard,
  Folder,
  Users,
  BarChart3,
  Shield,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface DashboardSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CreditCard, label: "Subscriptions", active: false },
  { icon: Folder, label: "Assets", active: false },
  { icon: Users, label: "Family", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Shield, label: "Security", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export function DashboardSidebar({ isOpen, onToggle }: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "glass-card border-r border-border/50 flex flex-col transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">C</span>
          </div>
          {isOpen && (
            <span className="font-semibold text-lg text-foreground">Coredex</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "h-8 w-8 text-muted-foreground hover:text-foreground transition-transform",
            !isOpen && "rotate-180"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <Separator className="opacity-50" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              item.active
                ? "bg-primary/10 text-primary glow-border"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <item.icon className={cn("h-5 w-5 flex-shrink-0", item.active && "text-primary")} />
            {isOpen && (
              <span className={cn("font-medium", item.active && "text-primary")}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <Separator className="opacity-50" />

      {/* User Profile */}
      <div className="p-4">
        <div
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer",
            !isOpen && "justify-center"
          )}
        >
          <Avatar className="h-10 w-10 ring-2 ring-primary/30">
            <AvatarImage src="/avatar.jpg" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          )}
          {isOpen && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}
