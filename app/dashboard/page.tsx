'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { apiFetch } from '@/lib/api'
import {
  Search,
  Bell,
  Shield,
  User,
  Settings,
  Home,
  Lock,
  CreditCard,
  Users,
  TrendingUp,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Plus,
  Banknote,
  Mail,
  UserPlus,
  FileText,
  BarChart3,
  Activity,
  DollarSign,
  Calendar,
  Zap,
  Globe,
  Smartphone,
  Cloud,
  Key,
  Heart,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar } from 'recharts'

interface User {
  id: number
  email: string
  role: string
  email_verified: boolean
  created_at: string
}

// Mock data
const kpiData = [
  { title: 'Total Digital Assets', value: '247', change: '+12%', icon: Lock, color: 'text-emerald-400' },
  { title: 'Monthly Subscription Spend', value: '$1,247', change: '-8%', icon: DollarSign, color: 'text-blue-400' },
  { title: 'Savings Identified', value: '$342', change: '+23%', icon: TrendingUp, color: 'text-green-400' },
  { title: 'Security Score', value: '98%', change: '+2%', icon: Shield, color: 'text-purple-400' },
  { title: 'Connected Services', value: '34', change: '+5%', icon: Zap, color: 'text-yellow-400' },
  { title: 'Family Members Protected', value: '4', change: '+1%', icon: Users, color: 'text-pink-400' },
]

const assetDistribution = [
  { name: 'Subscriptions', value: 40, color: '#95122C' },
  { name: 'Licenses', value: 25, color: '#7a0f1f' },
  { name: 'Domains', value: 15, color: '#5a0a15' },
  { name: 'Crypto', value: 10, color: '#3a060c' },
  { name: 'Cloud', value: 7, color: '#1a0306' },
  { name: 'Devices', value: 3, color: '#0a0103' },
]

const expenseTrend = [
  { month: 'Jan', spend: 1200, savings: 150 },
  { month: 'Feb', spend: 1350, savings: 200 },
  { month: 'Mar', spend: 1100, savings: 180 },
  { month: 'Apr', spend: 1400, savings: 250 },
  { month: 'May', spend: 1250, savings: 220 },
  { month: 'Jun', spend: 1300, savings: 300 },
]

const upcomingPayments = [
  { name: 'Netflix Premium', date: '2026-04-25', amount: '$15.99' },
  { name: 'Adobe Creative Cloud', date: '2026-04-28', amount: '$52.99' },
  { name: 'AWS Hosting', date: '2026-05-01', amount: '$89.50' },
]

const recommendations = [
  { type: 'savings', title: 'Downgrade unused Adobe plan', description: 'Save $20/month by switching to individual license', action: 'Optimize' },
  { type: 'security', title: 'Rotate API key for Stripe', description: 'Last rotated 6 months ago', action: 'Rotate' },
  { type: 'transfer', title: 'Transfer inactive domain', description: 'example.com expires in 30 days', action: 'Transfer' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiFetch<{ user: User }>('/v1/me')
        setUser(data.user)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        router.push('/auth/sign-in')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = () => {
    // Call logout API
    apiFetch('/auth/logout', { method: 'POST' })
    router.push('/auth/sign-in')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#161415]">
        <div className="text-[#F5F5F5] text-xl">Loading your digital ecosystem...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#161415] text-[#F5F5F5]">
      {/* Top Navbar */}
      <nav className="bg-[#1a1819] border-b border-[#2a2729] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="text-[#95122C] text-2xl font-bold">Coredex</div>
        </div>
        
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A3A3A3] h-4 w-4" />
            <Input 
              placeholder="Search assets, subscriptions..." 
              className="pl-10 bg-[#2a2729] border-[#3F3C3E] text-[#F5F5F5] placeholder-[#A3A3A3] focus:border-[#95122C]"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-[#95122C]">3</Badge>
          </Button>
          <Badge variant="outline" className="border-green-500 text-green-400">
            <Shield className="h-3 w-3 mr-1" />
            Secure
          </Badge>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#95122C] text-white">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#1a1819] border-r border-[#2a2729] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out pt-16 lg:pt-0`}>
          <nav className="p-4 space-y-2">
            {[
              { icon: Home, label: 'Dashboard', active: true },
              { icon: Lock, label: 'Assets Vault' },
              { icon: CreditCard, label: 'Subscriptions' },
              { icon: Key, label: 'Licenses' },
              { icon: Users, label: 'Family Access' },
              { icon: Heart, label: 'Legacy Transfer' },
              { icon: Shield, label: 'Security Center' },
              { icon: BarChart3, label: 'Analytics' },
              { icon: Zap, label: 'Integrations' },
              { icon: Banknote, label: 'Billing' },
              { icon: Settings, label: 'Settings' },
            ].map((item) => (
              <Button
                key={item.label}
                variant={item.active ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${item.active ? 'bg-[#95122C] text-white shadow-lg shadow-[#95122C]/20' : 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#2a2729]'}`}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-[#1a1819] to-[#2a2729] rounded-2xl p-8 border border-[#3F3C3E]">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F5F5F5] to-[#A3A3A3] bg-clip-text text-transparent">
                  Your Digital Life.<br />Fully Under Control.
                </h1>
                <p className="text-[#A3A3A3] text-lg mb-6">
                  Unified intelligence for subscriptions, assets, security and inheritance.
                </p>
                <Button className="bg-[#95122C] hover:bg-[#7a0f1f] text-white px-8 py-3 rounded-xl shadow-lg shadow-[#95122C]/20">
                  Explore Assets
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-[#95122C]/20 to-[#2a2729] rounded-full flex items-center justify-center">
                  <Lock className="h-24 w-24 text-[#95122C]" />
                </div>
              </div>
            </div>
          </section>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {kpiData.map((kpi) => (
              <Card key={kpi.title} className="bg-[#1a1819] border-[#2a2729] hover:border-[#3F3C3E] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                    <Badge variant="outline" className={`text-xs ${kpi.change.startsWith('+') ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}`}>
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                  <div className="text-[#A3A3A3] text-sm">{kpi.title}</div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-1 space-y-8">
              {/* Subscription Intelligence */}
              <Card className="bg-[#1a1819] border-[#2a2729]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F5F5F5]">
                    <Calendar className="h-5 w-5 mr-2 text-[#95122C]" />
                    Subscription Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-[#A3A3A3] uppercase tracking-wide mb-4">Upcoming Payments</div>
                  {upcomingPayments.map((payment) => (
                    <div key={payment.name} className="flex items-center justify-between p-3 bg-[#2a2729] rounded-lg">
                      <div>
                        <div className="font-medium">{payment.name}</div>
                        <div className="text-sm text-[#A3A3A3]">{payment.date}</div>
                      </div>
                      <div className="text-[#95122C] font-bold">{payment.amount}</div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-[#3F3C3E] text-[#A3A3A3] hover:bg-[#2a2729]">
                    View All Subscriptions
                  </Button>
                </CardContent>
              </Card>

              {/* Asset Distribution */}
              <Card className="bg-[#1a1819] border-[#2a2729]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F5F5F5]">
                    <PieChart className="h-5 w-5 mr-2 text-[#95122C]" />
                    Asset Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <RechartsPieChart.Pie
                        data={assetDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {assetDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart.Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {assetDistribution.map((item) => (
                      <div key={item.name} className="flex items-center text-sm">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="text-[#A3A3A3]">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center Section */}
            <div className="lg:col-span-1 space-y-8">
              {/* Security Center */}
              <Card className="bg-[#1a1819] border-[#2a2729]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F5F5F5]">
                    <Shield className="h-5 w-5 mr-2 text-[#95122C]" />
                    Security Center
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Zero-Knowledge Enabled</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Encryption Status</span>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Last Security Audit</span>
                    <span className="text-sm">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Backup Status</span>
                    <Badge className="bg-blue-500/20 text-blue-400">Synced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Threat Alerts</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">0</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Recommendations */}
              <Card className="bg-[#1a1819] border-[#2a2729]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F5F5F5]">
                    <Zap className="h-5 w-5 mr-2 text-[#95122C]" />
                    Smart Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-[#2a2729] rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium text-sm">{rec.title}</div>
                        <Badge variant="outline" className="text-xs border-[#95122C] text-[#95122C]">
                          {rec.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#A3A3A3] mb-3">{rec.description}</p>
                      <Button size="sm" className="bg-[#95122C] hover:bg-[#7a0f1f] text-white text-xs">
                        {rec.action}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-1 space-y-8">
              {/* Family Governance */}
              <Card className="bg-[#1a1819] border-[#2a2729]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F5F5F5]">
                    <Users className="h-5 w-5 mr-2 text-[#95122C]" />
                    Family Governance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Members</span>
                    <span className="font-bold">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Shared Budget</span>
                    <span className="font-bold">$500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Permissions</span>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Child Safe Mode</span>
                    <Badge className="bg-blue-500/20 text-blue-400">Enabled</Badge>
                  </div>
                  <Progress value={75} className="mt-4" />
                  <div className="text-xs text-[#A3A3A3] text-center">75% Protected</div>
                </CardContent>
              </Card>

              {/* Digital Legacy */}
              <Card className="bg-[#1a1819] border-[#2a2729]">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F5F5F5]">
                    <Heart className="h-5 w-5 mr-2 text-[#95122C]" />
                    Digital Legacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Trusted Contacts</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Emergency Package</span>
                    <Badge className="bg-green-500/20 text-green-400">Ready</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">Inheritance Status</span>
                    <span className="font-bold">92%</span>
                  </div>
                  <Progress value={92} className="mt-4" />
                  <Button size="sm" className="w-full bg-[#95122C] hover:bg-[#7a0f1f] text-white mt-4">
                    Manage Legacy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analytics Section */}
          <Card className="bg-[#1a1819] border-[#2a2729]">
            <CardHeader>
              <CardTitle className="flex items-center text-[#F5F5F5]">
                <Activity className="h-5 w-5 mr-2 text-[#95122C]" />
                Digital Expenses Trend
              </CardTitle>
              <CardDescription className="text-[#A3A3A3]">
                Monthly overview of your digital spending and savings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={expenseTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2729" />
                  <XAxis dataKey="month" stroke="#A3A3A3" />
                  <YAxis stroke="#A3A3A3" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1819', border: '1px solid #2a2729', borderRadius: '8px' }}
                    labelStyle={{ color: '#F5F5F5' }}
                  />
                  <Line type="monotone" dataKey="spend" stroke="#95122C" strokeWidth={2} />
                  <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#1a1819] border-[#2a2729]">
            <CardHeader>
              <CardTitle className="text-[#F5F5F5]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: Plus, label: 'Add Asset', color: 'bg-[#95122C] hover:bg-[#7a0f1f]' },
                  { icon: Banknote, label: 'Connect Bank', color: 'bg-blue-600 hover:bg-blue-700' },
                  { icon: Mail, label: 'Import Receipts', color: 'bg-green-600 hover:bg-green-700' },
                  { icon: UserPlus, label: 'Add Family', color: 'bg-purple-600 hover:bg-purple-700' },
                  { icon: FileText, label: 'Create Rule', color: 'bg-orange-600 hover:bg-orange-700' },
                ].map((action) => (
                  <Button key={action.label} className={`${action.color} text-white p-4 h-auto flex flex-col items-center space-y-2 rounded-xl shadow-lg`}>
                    <action.icon className="h-6 w-6" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  )
}
