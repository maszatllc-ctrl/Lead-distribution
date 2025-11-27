"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Lead } from "@/lib/types"
import { ShoppingCart, Package, Calendar, DollarSign, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeadDetailDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onPurchase?: (lead: Lead) => void
  userType?: "buyer" | "seller"
}

export function LeadDetailDialog({ lead, open, onOpenChange, onPurchase, userType = "buyer" }: LeadDetailDialogProps) {
  if (!lead) return null

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "hot":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "warm":
        return "bg-warning/10 text-warning border-warning/20"
      case "cold":
        return "bg-accent/10 text-accent border-accent/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{lead.title}</DialogTitle>
          <DialogDescription>Detailed information about this lead listing</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{lead.category}</Badge>
            <Badge variant="outline" className={cn("capitalize", getQualityColor(lead.quality))}>
              {lead.quality} Quality
            </Badge>
            {lead.status && (
              <Badge variant="outline" className="capitalize">
                {lead.status}
              </Badge>
            )}
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price per Lead</p>
                <p className="text-2xl font-semibold text-foreground">${lead.price}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quantity Available</p>
                <p className="text-2xl font-semibold text-foreground">{lead.quantity}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Listed Date</p>
                <p className="text-lg font-medium text-foreground">{lead.date}</p>
              </div>
            </div>

            {lead.seller && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Tag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seller</p>
                  <p className="text-lg font-medium text-foreground">{lead.seller}</p>
                </div>
              </div>
            )}
          </div>

          {lead.description && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{lead.description}</p>
              </div>
            </>
          )}

          <Separator />

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal ({lead.quantity} leads)</span>
              <span className="font-medium text-foreground">${(lead.price * lead.quantity).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Platform Fee (5%)</span>
              <span className="font-medium text-foreground">
                ${(lead.price * lead.quantity * 0.05).toLocaleString()}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-foreground">
                ${(lead.price * lead.quantity * 1.05).toLocaleString()}
              </span>
            </div>
          </div>

          {userType === "buyer" && lead.status === "available" && onPurchase && (
            <Button size="lg" className="w-full gap-2" onClick={() => onPurchase(lead)}>
              <ShoppingCart className="w-5 h-5" />
              Purchase Leads
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
