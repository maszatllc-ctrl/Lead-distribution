"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard } from "@/components/metric-card"
import { Wallet, Users, Plus, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mockRecentLeads = [
  {
    id: "1",
    name: "John Smith",
    type: "Term Life",
    state: "CA",
    price: 45.0,
    timestamp: "5 min ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    type: "Final Expense",
    state: "TX",
    price: 52.0,
    timestamp: "12 min ago",
  },
  {
    id: "3",
    name: "Michael Brown",
    type: "IUL",
    state: "NY",
    price: 68.0,
    timestamp: "25 min ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    type: "Term Life",
    state: "FL",
    price: 45.0,
    timestamp: "1 hour ago",
  },
  {
    id: "5",
    name: "Robert Wilson",
    type: "Mortgage Protection",
    state: "CA",
    price: 58.0,
    timestamp: "2 hours ago",
  },
]

export default function BuyerDashboard() {
  return (
    <DashboardLayout userType="buyer">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your lead purchases and balance.</p>
        </div>

        {/* Top metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            title="Wallet Balance"
            value="$2,450.00"
            change="Available to spend on leads"
            changeType="neutral"
            icon={<Wallet className="w-5 h-5" />}
          />
          <MetricCard
            title="Leads Today"
            value="14"
            change="Leads purchased in the last 24 hours"
            changeType="neutral"
            icon={<Users className="w-5 h-5" />}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6">
          <Link href="/buyer/wallet">
            <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all cursor-pointer group h-full">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Add Funds</h3>
                  <p className="text-sm text-white/80">Top up your wallet balance</p>
                </div>
                <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>

          <Link href="/buyer/campaigns">
            <Card className="p-6 bg-gradient-to-br from-foreground to-foreground/80 hover:from-foreground/90 hover:to-foreground/70 transition-all cursor-pointer group h-full">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-xl font-semibold text-background">Create Lead Filter</h3>
                  <p className="text-sm text-background/70">Set up a new lead acquisition filter</p>
                </div>
                <ArrowRight className="w-6 h-6 text-background/40 group-hover:text-background group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Leads Activity Feed */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Recent Leads</h2>
            <Link href="/buyer/leads">
              <Button variant="ghost" size="sm" className="gap-2">
                View all
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {mockRecentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {lead.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {lead.state}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.timestamp}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${lead.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
