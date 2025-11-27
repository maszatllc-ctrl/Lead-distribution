"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download, FileText } from "lucide-react"
import type { Lead } from "@/lib/types"

interface PurchaseSuccessDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PurchaseSuccessDialog({ lead, open, onOpenChange }: PurchaseSuccessDialogProps) {
  if (!lead) return null

  const handleDownload = () => {
    alert("Downloading lead data...")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <div className="flex flex-col items-center text-center space-y-6 py-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Purchase Successful!</h2>
            <p className="text-muted-foreground">
              You've successfully purchased {lead.quantity} leads from {lead.title}
            </p>
          </div>

          <div className="w-full bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Leads Purchased</span>
              <span className="font-semibold text-foreground">{lead.quantity}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="font-semibold text-foreground">
                ${(lead.price * lead.quantity * 1.05).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              Download Data
            </Button>
            <Button className="flex-1 gap-2" onClick={() => onOpenChange(false)}>
              <FileText className="w-4 h-4" />
              View Purchase
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
