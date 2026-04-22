"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const spendingData = [
  { month: "Jan", spending: 65, savings: 8 },
  { month: "Feb", spending: 72, savings: 12 },
  { month: "Mar", spending: 68, savings: 10 },
  { month: "Apr", spending: 85, savings: 5 },
  { month: "May", spending: 78, savings: 15 },
  { month: "Jun", spending: 82, savings: 18 },
  { month: "Jul", spending: 75, savings: 20 },
  { month: "Aug", spending: 82.4, savings: 18 },
]

const chartConfig = {
  spending: {
    label: "Monthly Spending",
    color: "#2dd4bf",
  },
  savings: {
    label: "Savings",
    color: "#06b6d4",
  },
}

export function SpendingChart() {
  return (
    <Card className="glass-card border-border/50 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Spending Overview
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2dd4bf]" />
              <span className="text-muted-foreground">Spending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
              <span className="text-muted-foreground">Savings</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={spendingData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <Area
                type="monotone"
                dataKey="spending"
                stroke="#2dd4bf"
                strokeWidth={2}
                fill="url(#spendingGradient)"
              />
              <Area
                type="monotone"
                dataKey="savings"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#savingsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
