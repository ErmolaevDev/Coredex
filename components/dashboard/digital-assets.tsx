"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Key, FileText, Globe, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const assets = [
  {
    type: "API Keys",
    icon: Key,
    count: 5,
    items: [
      { name: "OpenAI API", status: "active", masked: "sk-...a3F2" },
      { name: "Stripe API", status: "active", masked: "sk_live_...9xK" },
      { name: "AWS Access", status: "active", masked: "AKIA...W3Q" },
    ],
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    type: "Licenses",
    icon: FileText,
    count: 8,
    items: [
      { name: "JetBrains IDE", status: "active", expires: "Dec 2024" },
      { name: "Microsoft 365", status: "active", expires: "Mar 2025" },
      { name: "Sketch", status: "expired", expires: "Expired" },
    ],
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    type: "Domains",
    icon: Globe,
    count: 3,
    items: [
      { name: "myapp.com", status: "active", expires: "Aug 2025" },
      { name: "startup.io", status: "active", expires: "Nov 2024" },
      { name: "dev.tools", status: "warning", expires: "Apr 2024" },
    ],
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
]

export function DigitalAssets() {
  const [selectedCategory, setSelectedCategory] = useState("API Keys")
  const [showSecrets, setShowSecrets] = useState(false)
  const selectedAsset = assets.find((a) => a.type === selectedCategory)!

  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Digital Assets Vault
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {assets.reduce((acc, a) => acc + a.count, 0)} items
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Tabs */}
        <div className="flex gap-2">
          {assets.map((asset) => (
            <button
              key={asset.type}
              onClick={() => setSelectedCategory(asset.type)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                selectedCategory === asset.type
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <asset.icon className="h-4 w-4" />
              {asset.type}
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                {asset.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Asset List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {selectedCategory}
            </span>
            {selectedCategory === "API Keys" && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={() => setShowSecrets(!showSecrets)}
              >
                {showSecrets ? (
                  <EyeOff className="h-3 w-3 mr-1" />
                ) : (
                  <Eye className="h-3 w-3 mr-1" />
                )}
                {showSecrets ? "Hide" : "Show"}
              </Button>
            )}
          </div>
          
          {selectedAsset.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    selectedAsset.bgColor
                  )}
                >
                  <selectedAsset.icon
                    className={cn("h-4 w-4", selectedAsset.color)}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {"masked" in item
                      ? showSecrets
                        ? item.masked.replace("...", "xxxx")
                        : item.masked
                      : item.expires}
                  </p>
                </div>
              </div>
              <Badge
                className={cn(
                  "text-xs",
                  item.status === "active" &&
                    "bg-emerald-500/20 text-emerald-400",
                  item.status === "expired" &&
                    "bg-red-500/20 text-red-400",
                  item.status === "warning" &&
                    "bg-amber-500/20 text-amber-400"
                )}
              >
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
