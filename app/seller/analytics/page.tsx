"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, ShoppingBag, Target } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 4200, leads: 142 },
  { month: "Feb", revenue: 5800, leads: 198 },
  { month: "Mar", revenue: 7200, leads: 245 },
  { month: "Apr", revenue: 6500, leads: 221 },
  { month: "May", revenue: 8900, leads: 302 },
  { month: "Jun", revenue: 10200, leads: 347 },
]

const categoryData = [
  { name: "SaaS", value: 8450, color: "hsl(var(--chart-1))" },
  { name: "Marketing", value: 6280, color: "hsl(var(--chart-2))" },
  { name: "Real Estate", value: 5120, color: "hsl(var(--chart-3))" },
  { name: "Healthcare", value: 4890, color: "hsl(var(--chart-4))" },
  { name: "Finance", value: 3780, color: "hsl(var(--chart-5))" },
]

const conversionData = [
  { week: "Week 1", views: 450, purchases: 89 },
  { week: "Week 2", views: 520, purchases: 102 },
  { week: "Week 3", views: 480, purchases: 94 },
  { week: "Week 4", views: 610, purchases: 118 },
]

export default function SellerAnalytics() {
  return (
    <DashboardLayout userType="seller">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Detailed insights into your sales performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="$42,850"
            change="+23% from last month"
            changeType="positive"
            icon={<DollarSign className="w-5 h-5" />}
          />
          <MetricCard
            title="Avg. Deal Size"
            value="$275"
            change="+8% from last month"
            changeType="positive"
            icon={<Target className="w-5 h-5" />}
          />
          <MetricCard
            title="Conversion Rate"
            value="19.3%"
            change="+2.4% from last month"
            changeType="positive"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            title="Total Sales"
            value="1,248"
            change="+156 this month"
            changeType="positive"
            icon={<ShoppingBag className="w-5 h-5" />}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">Revenue & Leads Sold</h2>
              <p className="text-sm text-muted-foreground mt-1">Monthly performance over the last 6 months</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">Revenue by Category</h2>
              <p className="text-sm text-muted-foreground mt-1">Distribution of sales across categories</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">Conversion Funnel</h2>
            <p className="text-sm text-muted-foreground mt-1">Views vs purchases over the last 4 weeks</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="week" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="views" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="purchases" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Leads</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Enterprise SaaS Leads</span>
                <span className="text-sm font-semibold text-foreground">$8,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Marketing Qualified</span>
                <span className="text-sm font-semibold text-foreground">$6,280</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Real Estate Buyers</span>
                <span className="text-sm font-semibold text-foreground">$5,120</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                <div>
                  <p className="text-foreground font-medium">New purchase</p>
                  <p className="text-muted-foreground text-xs">Healthcare leads sold - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-chart-2 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-foreground font-medium">Listing approved</p>
                  <p className="text-muted-foreground text-xs">SaaS leads verified - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-chart-3 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-foreground font-medium">New inquiry</p>
                  <p className="text-muted-foreground text-xs">Buyer messaged you - 1 day ago</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quality Metrics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Hot Leads</span>
                  <span className="text-foreground font-medium">45%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Warm Leads</span>
                  <span className="text-foreground font-medium">35%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-chart-2 h-2 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Cold Leads</span>
                  <span className="text-foreground font-medium">20%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-chart-3 h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
