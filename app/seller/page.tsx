"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Database, Users, AlertCircle, TrendingUp, Plus } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Link from "next/link"
import { useEffect, useState } from "react"

type DashboardResponse = {
  revenue: number
  leadsSold: number
  unassigned: number
  activeBuyers: number
  revenueByDay: { date: string; revenue: number }[]
  recent: {
    purchasedAt: string
    price: number
    buyer: { name: string }
    lead: { firstName: string; lastName: string; leadType: string }
  }[]
}

export default function SellerDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/seller/dashboard")
        if (!res.ok) throw new Error("Failed to load dashboard")
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const revenueData = data?.revenueByDay || []
  const recentLeads =
    data?.recent.map((item) => ({
      timestamp: new Date(item.purchasedAt).toLocaleString(),
      leadName: `${item.lead.firstName} ${item.lead.lastName}`,
      leadType: item.lead.leadType,
      buyer: item.buyer.name,
      price: item.price,
    })) || []

  return (
    <DashboardLayout userType="seller">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor your performance and manage your lead distribution.</p>
          </div>
          <Link href="/seller/buyers">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Buyer
            </Button>
          </Link>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold text-foreground">
                  {loading ? "..." : `$${Number(data?.revenue ?? 0).toFixed(0)}`}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">12.5%</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Leads Sold</p>
                <p className="text-3xl font-bold text-foreground">{loading ? "..." : data?.leadsSold ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Database className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">8.2%</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Unassigned Leads</p>
                <p className="text-3xl font-bold text-foreground">{loading ? "..." : data?.unassigned ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 h-6" />
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Active Buyers</p>
                <p className="text-3xl font-bold text-foreground">{loading ? "..." : data?.activeBuyers ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 h-6" />
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Revenue Over Time</h2>
              <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Leads Sold */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Recent Leads Sold</h2>
              <p className="text-sm text-muted-foreground mt-1">Latest 10 lead transactions</p>
            </div>
            <Link href="/seller/leads">
              <Button variant="outline" size="sm">
                View all leads
              </Button>
            </Link>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">Lead Name</TableHead>
                  <TableHead className="font-semibold">Lead Type</TableHead>
                  <TableHead className="font-semibold">Buyer</TableHead>
                  <TableHead className="font-semibold text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((lead, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="text-muted-foreground">{lead.timestamp}</TableCell>
                    <TableCell className="font-medium text-foreground">{lead.leadName}</TableCell>
                    <TableCell className="text-foreground">{lead.leadType}</TableCell>
                    <TableCell className="text-foreground">{lead.buyer}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">${lead.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
