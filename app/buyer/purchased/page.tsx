"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { LeadsTable } from "@/components/leads-table"
import { LeadDetailDialog } from "@/components/lead-detail-dialog"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { mockPurchasedLeads } from "@/lib/mock-data"
import type { Lead } from "@/lib/types"

export default function PurchasedLeads() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailOpen(true)
  }

  const totalSpent = mockPurchasedLeads.reduce((sum, lead) => sum + lead.price * lead.quantity * 1.05, 0)
  const totalLeads = mockPurchasedLeads.reduce((sum, lead) => sum + lead.quantity, 0)

  const handleExportAll = () => {
    alert("Exporting all purchased leads...")
  }

  return (
    <DashboardLayout userType="buyer">
      <div className="p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Purchased Leads</h1>
            <p className="text-muted-foreground mt-1">Manage and download your purchased lead data</p>
          </div>
          <Button className="gap-2" onClick={handleExportAll}>
            <Download className="w-4 h-4" />
            Export All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Purchases</p>
                <p className="text-3xl font-semibold text-foreground">{mockPurchasedLeads.length}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-3xl font-semibold text-foreground">{totalLeads}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-3xl font-semibold text-foreground">${Math.round(totalSpent).toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </Card>
        </div>

        <LeadsTable leads={mockPurchasedLeads} showActions={true} actionType="view" onAction={handleViewDetails} />

        <LeadDetailDialog lead={selectedLead} open={isDetailOpen} onOpenChange={setIsDetailOpen} userType="buyer" />
      </div>
    </DashboardLayout>
  )
}
