"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { CampaignEditorDialog } from "@/components/campaign-editor-dialog"

const mockLeadFilters = [
  {
    id: "1",
    name: "California Term Life - High Priority",
    status: "active",
    price: 45.0,
    dailyCap: 20,
    filters: "Life: Term, CA, 25-45, Non-smoker",
  },
  {
    id: "2",
    name: "Texas Final Expense",
    status: "active",
    price: 52.0,
    dailyCap: 15,
    filters: "Life: Final Expense, TX, 55+",
  },
  {
    id: "3",
    name: "IUL - Multiple States",
    status: "paused",
    price: 68.0,
    dailyCap: 10,
    filters: "Life: IUL, NY/FL/CA, 30-60, Non-smoker",
  },
]

export default function LeadFiltersPage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingLeadFilter, setEditingLeadFilter] = useState<(typeof mockLeadFilters)[0] | null>(null)
  const [leadFilterStatus, setLeadFilterStatus] = useState<Record<string, boolean>>({
    "1": true,
    "2": true,
    "3": false,
  })

  const handleEdit = (leadFilter: (typeof mockLeadFilters)[0]) => {
    setEditingLeadFilter(leadFilter)
    setIsEditorOpen(true)
  }

  const handleCreate = () => {
    setEditingLeadFilter(null)
    setIsEditorOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Deleting lead filter:", id)
  }

  const handleStatusToggle = (id: string, checked: boolean) => {
    setLeadFilterStatus((prev) => ({ ...prev, [id]: checked }))
    console.log("[v0] Toggling lead filter status:", id, checked)
  }

  return (
    <DashboardLayout userType="buyer">
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead Filters</h1>
            <p className="text-muted-foreground mt-1">Manage your lead acquisition filters</p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Lead Filter
          </Button>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Lead Filter Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Price</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Daily Cap</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Filters</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockLeadFilters.map((leadFilter) => (
                  <tr key={leadFilter.id} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{leadFilter.name}</p>
                    </td>
                    <td className="p-4">
                      <Switch
                        checked={leadFilterStatus[leadFilter.id] ?? leadFilter.status === "active"}
                        onCheckedChange={(checked) => handleStatusToggle(leadFilter.id, checked)}
                      />
                    </td>
                    <td className="p-4">
                      <p className="text-foreground">${leadFilter.price.toFixed(2)} / lead</p>
                    </td>
                    <td className="p-4">
                      <p className="text-foreground">{leadFilter.dailyCap} leads/day</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-muted-foreground">{leadFilter.filters}</p>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(leadFilter.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(leadFilter)} className="gap-2">
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <CampaignEditorDialog open={isEditorOpen} onOpenChange={setIsEditorOpen} campaign={editingLeadFilter} />
      </div>
    </DashboardLayout>
  )
}
