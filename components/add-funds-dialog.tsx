"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface AddFundsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddFundsDialog({ open, onOpenChange }: AddFundsDialogProps) {
  const [amount, setAmount] = useState("100")

  const quickAmounts = [50, 100, 250, 500, 1000]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Funds</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button key={quickAmount} variant="outline" size="sm" onClick={() => setAmount(quickAmount.toString())}>
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <select
              id="paymentMethod"
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
            >
              <option>Visa •••• 4242</option>
              <option>Mastercard •••• 5555</option>
            </select>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-medium text-foreground">${amount}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Processing Fee</span>
              <span className="text-sm font-medium text-foreground">$0.00</span>
            </div>
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-semibold text-foreground">${amount}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Funds</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
