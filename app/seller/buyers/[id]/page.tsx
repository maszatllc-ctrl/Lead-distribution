"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Edit, Trash2, DollarSign, Package, TrendingUp } from "lucide-react"
import Link from "next/link"

const buyerTransactions = [
  { id: "1", date: "2025-01-26", description: "Credits Added", amount: 500.0, type: "credit" },
  { id: "2", date: "2025-01-26", description: "Lead Purchase - John Smith", amount: -45.0, type: "debit" },
  { id: "3", date: "2025-01-25", description: "Lead Purchase - Sarah Johnson", amount: -38.5, type: "debit" },
  { id: "4", date: "2025-01-25", description: "Credits Added", amount: 1000.0, type: "credit" },
  { id: "5", date: "2025-01-24", description: "Lead Purchase - Michael Chen", amount: -52.0, type: "debit" },
]

const buyerLeads = [
  { id: "1", timestamp: "2025-01-26 14:32", leadName: "John Smith", type: "Term Life", price: 45.0 },
  { id: "2", timestamp: "2025-01-26 13:15", leadName: "Sarah Johnson", type: "Final Expense", price: 38.5 },
  { id: "3", timestamp: "2025-01-25 16:44", leadName: "Michael Chen", type: "Medicare", price: 52.0 },
  { id: "4", timestamp: "2025-01-25 14:12", leadName: "Emily Davis", type: "Term Life", price: 45.0 },
]

const buyerCampaigns = [
  {
    id: "1",
    name: "Term Life - Texas",
    status: "active",
    dailyCap: 10,
    filters: "Age: 30-65, State: TX",
    price: 45.0,
  },
  {
    id: "2",
    name: "Final Expense - Florida",
    status: "paused",
    dailyCap: 5,
    filters: "Age: 50-85, State: FL",
    price: 38.5,
  },
  {
    id: "3",
    name: "Medicare - California",
    status: "active",
    dailyCap: 8,
    filters: "Age: 65+, State: CA",
    price: 52.0,
  },
]

export default function BuyerDetails() {
  const [isActive, setIsActive] = useState(true)
  const [showAddCredits, setShowAddCredits] = useState(false)
  const [campaigns, setCampaigns] = useState(buyerCampaigns)

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: campaign.status === "active" ? "paused" : "active" } : campaign,
      ),
    )
  }

  return (
    <DashboardLayout userType="seller">
      <div className="p-8 space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/seller/buyers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">ABC Insurance</h1>
            <p className="text-muted-foreground mt-1">Buyer account details and management</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <span className="text-sm font-medium text-foreground">{isActive ? "Active" : "Paused"}</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads Purchased</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Wallet Balance</p>
                </div>
                <p className="text-3xl font-semibold text-foreground">$2,450.00</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Leads Purchased</p>
                </div>
                <p className="text-3xl font-semibold text-foreground">324</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                </div>
                <p className="text-3xl font-semibold text-foreground">2</p>
              </Card>
            </div>

            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Wallet & Transactions</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage buyer credits and view transaction history
                  </p>
                </div>
                <Dialog open={showAddCredits} onOpenChange={setShowAddCredits}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Credits
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Credits to Buyer</DialogTitle>
                      <DialogDescription>Add credits to the buyer's wallet balance.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="500.00" min="0" step="0.01" />
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowAddCredits(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowAddCredits(false)}>Add Credits</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Description</TableHead>
                      <TableHead className="font-semibold text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buyerTransactions.slice(0, 5).map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-muted/30">
                        <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                        <TableCell className="text-foreground">{transaction.description}</TableCell>
                        <TableCell
                          className={`text-right font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "credit" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end">
                <Button variant="link" size="sm">
                  View full history
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">Leads Purchased</h2>
                <p className="text-sm text-muted-foreground mt-1">All leads purchased by this buyer</p>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Timestamp</TableHead>
                      <TableHead className="font-semibold">Lead Name</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buyerLeads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-muted/30">
                        <TableCell className="text-muted-foreground">{lead.timestamp}</TableCell>
                        <TableCell className="font-medium text-foreground">{lead.leadName}</TableCell>
                        <TableCell className="text-foreground">{lead.type}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">
                          ${lead.price.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">Buyer Campaigns</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage campaigns for this buyer</p>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Campaign Name</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Daily Cap</TableHead>
                      <TableHead className="font-semibold">Filters</TableHead>
                      <TableHead className="font-semibold">Price</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium text-foreground">{campaign.name}</TableCell>
                        <TableCell>
                          <Switch
                            checked={campaign.status === "active"}
                            onCheckedChange={() => toggleCampaignStatus(campaign.id)}
                          />
                        </TableCell>
                        <TableCell className="text-foreground">{campaign.dailyCap} leads/day</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{campaign.filters}</TableCell>
                        <TableCell className="font-semibold text-foreground">${campaign.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2 text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
