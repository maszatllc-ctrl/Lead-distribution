"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lead } from "@/lib/types"

interface LeadsTableProps {
  leads: Lead[]
  showActions?: boolean
  actionType?: "buy" | "view" | "manage"
  onAction?: (lead: Lead) => void
}

export function LeadsTable({ leads, showActions = true, actionType = "buy", onAction }: LeadsTableProps) {
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

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "available":
        return "bg-success/10 text-success border-success/20"
      case "purchased":
        return "bg-primary/10 text-primary border-primary/20"
      case "pending":
        return "bg-warning/10 text-warning border-warning/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Lead Title</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Quality</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Quantity</TableHead>
            {actionType !== "manage" && <TableHead className="font-semibold">Seller</TableHead>}
            <TableHead className="font-semibold">Date</TableHead>
            {showActions && <TableHead className="font-semibold text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-muted/30">
                <TableCell className="font-medium text-foreground">{lead.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {lead.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("font-medium capitalize", getQualityColor(lead.quality))}>
                    {lead.quality}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-foreground">${lead.price}</TableCell>
                <TableCell className="text-muted-foreground">{lead.quantity}</TableCell>
                {actionType !== "manage" && <TableCell className="text-muted-foreground">{lead.seller}</TableCell>}
                <TableCell className="text-muted-foreground">{lead.date}</TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    {actionType === "buy" && (
                      <Button size="sm" onClick={() => onAction?.(lead)} className="gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    )}
                    {actionType === "view" && (
                      <Button size="sm" variant="outline" onClick={() => onAction?.(lead)} className="gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    )}
                    {actionType === "manage" && lead.status && (
                      <Badge variant="outline" className={cn("font-medium capitalize", getStatusColor(lead.status))}>
                        {lead.status}
                      </Badge>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
