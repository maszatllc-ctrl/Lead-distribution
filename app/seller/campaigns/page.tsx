"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Campaign {
  id: string
  name: string
  leadType: string
  states: string[]
  basePrice: number
  activeBuyers: number
  status: "active" | "paused"
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Term Life - TX",
    leadType: "Term Life",
    states: ["TX"],
    basePrice: 45.0,
    activeBuyers: 3,
    status: "active",
  },
  {
    id: "2",
    name: "Mortgage Protection - FL",
    leadType: "Mortgage Protection",
    states: ["FL", "GA"],
    basePrice: 41.0,
    activeBuyers: 2,
    status: "active",
  },
  {
    id: "3",
    name: "Final Expense - Multi-State",
    leadType: "Final Expense",
    states: ["CA", "TX", "FL", "NY"],
    basePrice: 38.5,
    activeBuyers: 5,
    status: "paused",
  },
  {
    id: "4",
    name: "Medicare - CA",
    leadType: "Medicare",
    states: ["CA"],
    basePrice: 52.0,
    activeBuyers: 4,
    status: "active",
  },
]

export default function SellerCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [showEditor, setShowEditor] = useState(false)
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([])

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: campaign.status === "active" ? "paused" : "active" } : campaign,
      ),
    )
  }

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCampaignIds(campaigns.map((c) => c.id))
    } else {
      setSelectedCampaignIds([])
    }
  }

  const toggleSelectCampaign = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCampaignIds([...selectedCampaignIds, id])
    } else {
      setSelectedCampaignIds(selectedCampaignIds.filter((campaignId) => campaignId !== id))
    }
  }

  const handleDeleteSelected = () => {
    setCampaigns(campaigns.filter((campaign) => !selectedCampaignIds.includes(campaign.id)))
    setSelectedCampaignIds([])
  }

  return (
    <DashboardLayout userType="seller">
      <div className="p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead Filters</h1>
            <p className="text-muted-foreground mt-1">Define your lead products and pricing for buyers.</p>
          </div>
          <Dialog open={showEditor} onOpenChange={setShowEditor}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Lead Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Lead Filter</DialogTitle>
                <DialogDescription>Define a new lead filter product for buyers.</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-name">Lead Filter Name</Label>
                    <Input id="campaign-name" placeholder="e.g., Term Life - Texas" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lead-type">Lead Type</Label>
                    <Select>
                      <SelectTrigger id="lead-type">
                        <SelectValue placeholder="Select lead type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="term">Term Life</SelectItem>
                        <SelectItem value="final">Final Expense</SelectItem>
                        <SelectItem value="medicare">Medicare</SelectItem>
                        <SelectItem value="mortgage">Mortgage Protection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="base-price">Base Price per Lead</Label>
                    <Input id="base-price" type="number" placeholder="45.00" min="0" step="0.01" />
                  </div>

                  <div className="grid gap-2">
                    <Label>States</Label>
                    <div className="border border-border rounded-lg p-3 max-h-[200px] overflow-y-auto">
                      <div className="grid grid-cols-4 gap-2">
                        {["TX", "FL", "CA", "NY", "PA", "IL", "OH", "GA", "NC", "MI"].map((state) => (
                          <label key={state} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-foreground">{state}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="campaign-status" defaultChecked />
                    <Label htmlFor="campaign-status">Active</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowEditor(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowEditor(false)}>Create Lead Filter</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6">
          {selectedCampaignIds.length > 0 && (
            <div className="mb-4 flex items-center gap-3">
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected} className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete {selectedCampaignIds.length} {selectedCampaignIds.length === 1 ? "filter" : "filters"}
              </Button>
            </div>
          )}

          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCampaignIds.length === campaigns.length && campaigns.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Lead Filter Name</TableHead>
                  <TableHead className="font-semibold">Lead Type</TableHead>
                  <TableHead className="font-semibold">States / Regions</TableHead>
                  <TableHead className="font-semibold">Base Price</TableHead>
                  <TableHead className="font-semibold">Active Buyers</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Checkbox
                        checked={selectedCampaignIds.includes(campaign.id)}
                        onCheckedChange={(checked) => toggleSelectCampaign(campaign.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{campaign.name}</TableCell>
                    <TableCell className="text-foreground">{campaign.leadType}</TableCell>
                    <TableCell className="text-muted-foreground">{campaign.states.join(", ")}</TableCell>
                    <TableCell className="font-semibold text-foreground">${campaign.basePrice.toFixed(2)}</TableCell>
                    <TableCell className="text-foreground">{campaign.activeBuyers}</TableCell>
                    <TableCell>
                      <Switch
                        checked={campaign.status === "active"}
                        onCheckedChange={() => toggleCampaignStatus(campaign.id)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
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
