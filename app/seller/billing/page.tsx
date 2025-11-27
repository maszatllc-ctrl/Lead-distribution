"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, CheckCircle2 } from "lucide-react"

const paymentHistory = [
  { id: "1", date: "2025-01-01", amount: 99.0, status: "paid", invoice: "INV-2025-001" },
  { id: "2", date: "2024-12-01", amount: 99.0, status: "paid", invoice: "INV-2024-012" },
  { id: "3", date: "2024-11-01", amount: 99.0, status: "paid", invoice: "INV-2024-011" },
  { id: "4", date: "2024-10-01", amount: 99.0, status: "paid", invoice: "INV-2024-010" },
]

export default function SellerBilling() {
  return (
    <DashboardLayout userType="seller">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground mt-1">Manage your subscription and payment information.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Current Plan</h2>
              <p className="text-sm text-muted-foreground mt-1">Your subscription details</p>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Pro Plan</h3>
                  <p className="text-sm text-muted-foreground mt-1">Perfect for growing businesses</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Active
                </Badge>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Unlimited buyers</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Unlimited leads</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Advanced analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Priority support</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">Upgrade Plan</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Cancel Subscription
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Payment Method</h2>
              <p className="text-sm text-muted-foreground mt-1">Manage your payment details</p>
            </div>

            <div className="p-4 border border-border rounded-lg flex items-center gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <CreditCard className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2026</p>
              </div>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground">Billing Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">seller@leadflow.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company</span>
                  <span className="text-foreground">LeadFlow Inc.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span className="text-foreground text-right">123 Main St, Austin, TX 78701</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Update Billing Info
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">Payment History</h2>
            <p className="text-sm text-muted-foreground mt-1">View and download your past invoices</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Invoice</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/30">
                    <TableCell className="text-foreground">{payment.date}</TableCell>
                    <TableCell className="font-semibold text-foreground">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{payment.invoice}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </TableCell>
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
