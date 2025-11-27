"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { LeadsTable } from "@/components/leads-table"
import { LeadDetailDialog } from "@/components/lead-detail-dialog"
import { PurchaseSuccessDialog } from "@/components/purchase-success-dialog"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockAvailableLeads } from "@/lib/mock-data"
import type { Lead } from "@/lib/types"

export default function BrowseLeads() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedQuality, setSelectedQuality] = useState("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [purchasedLead, setPurchasedLead] = useState<Lead | null>(null)

  const filteredLeads = mockAvailableLeads.filter((lead) => {
    const matchesSearch =
      lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.seller?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || lead.category.toLowerCase() === selectedCategory
    const matchesQuality = selectedQuality === "all" || lead.quality === selectedQuality

    return matchesSearch && matchesCategory && matchesQuality
  })

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailOpen(true)
  }

  const handlePurchase = (lead: Lead) => {
    setIsDetailOpen(false)
    setPurchasedLead(lead)
    setIsSuccessOpen(true)
  }

  return (
    <DashboardLayout userType="buyer">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Browse Leads</h1>
          <p className="text-muted-foreground mt-1">Discover high-quality leads from verified sellers</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by title, category, or seller..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                <SelectTrigger className="w-[180px]">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Quality</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {filteredLeads.length} leads available
            </Badge>
            {(selectedCategory !== "all" || selectedQuality !== "all" || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all")
                  setSelectedQuality("all")
                  setSearchQuery("")
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        <LeadsTable leads={filteredLeads} showActions={true} actionType="buy" onAction={handleViewDetails} />

        <LeadDetailDialog
          lead={selectedLead}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          onPurchase={handlePurchase}
          userType="buyer"
        />

        <PurchaseSuccessDialog lead={purchasedLead} open={isSuccessOpen} onOpenChange={setIsSuccessOpen} />
      </div>
    </DashboardLayout>
  )
}
