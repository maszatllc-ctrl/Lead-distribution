"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, CreditCard, Trash2, Star, SettingsIcon } from "lucide-react"
import { useState } from "react"
import { AddFundsDialog } from "@/components/add-funds-dialog"
import { AddPaymentMethodDialog } from "@/components/add-payment-method-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockPaymentMethods = [
  {
    id: "1",
    brand: "Visa",
    last4: "4242",
    expiry: "12/2026",
    isPrimary: true,
  },
  {
    id: "2",
    brand: "Mastercard",
    last4: "5555",
    expiry: "08/2025",
    isPrimary: false,
  },
]

const mockTransactions = [
  {
    id: "1",
    date: "2025-01-20",
    description: "Lead purchase - John Smith",
    amount: -45.0,
    balance: 2450.0,
  },
  {
    id: "2",
    date: "2025-01-20",
    description: "Lead purchase - Sarah Johnson",
    amount: -52.0,
    balance: 2495.0,
  },
  {
    id: "3",
    date: "2025-01-19",
    description: "Wallet top-up",
    amount: 500.0,
    balance: 2547.0,
  },
  {
    id: "4",
    date: "2025-01-18",
    description: "Lead purchase - Michael Brown",
    amount: -68.0,
    balance: 2047.0,
  },
  {
    id: "5",
    date: "2025-01-18",
    description: "Auto-recharge",
    amount: 1000.0,
    balance: 2115.0,
  },
]

export default function WalletPage() {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false)
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false)
  const [isAutoRechargeOpen, setIsAutoRechargeOpen] = useState(false)
  const [autoRechargeEnabled, setAutoRechargeEnabled] = useState(true)
  const [rechargeThreshold, setRechargeThreshold] = useState(500)
  const [rechargeAmount, setRechargeAmount] = useState(1000)
  const [isSpendingLimitOpen, setIsSpendingLimitOpen] = useState(false)
  const [spendingLimitEnabled, setSpendingLimitEnabled] = useState(false)
  const [spendingLimitAmount, setSpendingLimitAmount] = useState(5000)
  const [spendingLimitPeriod, setSpendingLimitPeriod] = useState("month")

  const handleSaveAutoRecharge = () => {
    console.log("[v0] Saving auto-recharge settings:", {
      enabled: autoRechargeEnabled,
      threshold: rechargeThreshold,
      amount: rechargeAmount,
    })
    setIsAutoRechargeOpen(false)
  }

  const handleSaveSpendingLimit = () => {
    console.log("[v0] Saving spending limit settings:", {
      enabled: spendingLimitEnabled,
      amount: spendingLimitAmount,
      period: spendingLimitPeriod,
    })
    setIsSpendingLimitOpen(false)
  }

  return (
    <DashboardLayout userType="buyer">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
          <p className="text-muted-foreground mt-1">Manage your balance and payment methods</p>
        </div>

        {/* Wallet Balance Card */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">Wallet Balance</p>
            <p className="text-5xl font-bold text-foreground">$2,450.00</p>
            <p className="text-sm text-muted-foreground">Funds are used automatically for your active campaigns.</p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Auto-Recharge</p>
                <p className="text-xs text-muted-foreground">
                  {autoRechargeEnabled
                    ? `Add $${rechargeAmount} when balance drops below $${rechargeThreshold}`
                    : "Auto-recharge is disabled"}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsAutoRechargeOpen(true)} className="gap-2">
                <SettingsIcon className="w-4 h-4" />
                Settings
              </Button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Spending Limit</p>
                <p className="text-xs text-muted-foreground">
                  {spendingLimitEnabled
                    ? `Maximum $${spendingLimitAmount} per ${spendingLimitPeriod}`
                    : "No spending limit set"}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsSpendingLimitOpen(true)} className="gap-2">
                <SettingsIcon className="w-4 h-4" />
                Settings
              </Button>
            </div>

            <Button onClick={() => setIsAddFundsOpen(true)} className="gap-2 mt-4">
              <Plus className="w-4 h-4" />
              Add Funds
            </Button>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Payment Methods</h2>
            <Button onClick={() => setIsAddPaymentOpen(true)} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Payment Method
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {mockPaymentMethods.map((method) => (
              <Card key={method.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {method.brand} •••• {method.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                    </div>
                  </div>
                  {method.isPrimary && (
                    <Badge variant="secondary" className="gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Primary
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {!method.isPrimary && (
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Set as Primary
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold text-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-foreground">Description</th>
                    <th className="text-right p-4 text-sm font-semibold text-foreground">Amount</th>
                    <th className="text-right p-4 text-sm font-semibold text-foreground">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border last:border-0">
                      <td className="p-4">
                        <p className="text-sm text-foreground">{transaction.date}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground">{transaction.description}</p>
                      </td>
                      <td className="p-4 text-right">
                        <p
                          className={`text-sm font-semibold ${
                            transaction.amount > 0
                              ? "text-green-600 dark:text-green-500"
                              : "text-red-600 dark:text-red-500"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                      </td>
                      <td className="p-4 text-right">
                        <p className="text-sm text-muted-foreground">${transaction.balance.toFixed(2)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <AddFundsDialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen} />
        <AddPaymentMethodDialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen} />

        <Dialog open={isAutoRechargeOpen} onOpenChange={setIsAutoRechargeOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Auto-Recharge Settings</DialogTitle>
              <DialogDescription>
                Automatically add funds to your wallet when your balance drops below a certain amount.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoRechargeToggle" className="text-sm font-medium">
                    Enable Auto-Recharge
                  </Label>
                  <p className="text-xs text-muted-foreground">Automatically top up your wallet</p>
                </div>
                <Switch
                  id="autoRechargeToggle"
                  checked={autoRechargeEnabled}
                  onCheckedChange={setAutoRechargeEnabled}
                />
              </div>

              {autoRechargeEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="threshold">Recharge When Balance Falls Below</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        id="threshold"
                        type="number"
                        value={rechargeThreshold}
                        onChange={(e) => setRechargeThreshold(Number(e.target.value))}
                        min={0}
                        step={100}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Recharge Amount</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        id="amount"
                        type="number"
                        value={rechargeAmount}
                        onChange={(e) => setRechargeAmount(Number(e.target.value))}
                        min={0}
                        step={100}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAutoRechargeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAutoRecharge}>Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isSpendingLimitOpen} onOpenChange={setIsSpendingLimitOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Spending Limit Settings</DialogTitle>
              <DialogDescription>
                Set a maximum amount you can spend within a specific time period to control your budget.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="spendingLimitToggle" className="text-sm font-medium">
                    Enable Spending Limit
                  </Label>
                  <p className="text-xs text-muted-foreground">Control maximum spending per period</p>
                </div>
                <Switch
                  id="spendingLimitToggle"
                  checked={spendingLimitEnabled}
                  onCheckedChange={setSpendingLimitEnabled}
                />
              </div>

              {spendingLimitEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="spendingAmount">Maximum Spending Amount</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        id="spendingAmount"
                        type="number"
                        value={spendingLimitAmount}
                        onChange={(e) => setSpendingLimitAmount(Number(e.target.value))}
                        min={0}
                        step={100}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="period">Time Period</Label>
                    <Select value={spendingLimitPeriod} onValueChange={setSpendingLimitPeriod}>
                      <SelectTrigger id="period">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Per Week</SelectItem>
                        <SelectItem value="month">Per Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      When you reach your spending limit, campaigns will automatically pause until the next period
                      begins.
                    </p>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSpendingLimitOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSpendingLimit}>Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
