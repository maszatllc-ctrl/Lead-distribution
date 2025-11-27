"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

interface CampaignEditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaign: any
}

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

export function CampaignEditorDialog({ open, onOpenChange, campaign }: CampaignEditorDialogProps) {
  const [isActive, setIsActive] = useState(campaign?.status === "active" ?? true)
  const [selectedStates, setSelectedStates] = useState<string[]>(["CA", "TX", "NY"])

  const toggleState = (state: string) => {
    setSelectedStates((prev) => (prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]))
  }

  const selectAllStates = () => {
    setSelectedStates(US_STATES)
  }

  const deselectAllStates = () => {
    setSelectedStates([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{campaign ? "Edit Lead Filter" : "Create Lead Filter"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Lead Filter Name</Label>
            <Input id="name" defaultValue={campaign?.name} placeholder="e.g. California Term Life" />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lead Filter Status</Label>
              <p className="text-sm text-muted-foreground">Enable or pause this lead filter</p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <Separator />

          {/* Lead Type */}
          <div className="space-y-2">
            <Label htmlFor="leadType">Lead Type</Label>
            <select
              id="leadType"
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
            >
              <option>Term Life</option>
              <option>Final Expense</option>
              <option>Mortgage Protection</option>
              <option>IUL</option>
              <option>Whole Life</option>
            </select>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <Label htmlFor="price">Price per Lead (read-only)</Label>
            <Input
              id="price"
              type="text"
              defaultValue={`$${campaign?.price.toFixed(2) ?? "45.00"}`}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Pricing is set by the seller and cannot be changed</p>
          </div>

          {/* Daily Cap */}
          <div className="space-y-2">
            <Label htmlFor="dailyCap">Daily Cap (optional)</Label>
            <Input id="dailyCap" type="number" defaultValue={campaign?.dailyCap} placeholder="e.g. 20" />
            <p className="text-xs text-muted-foreground">Maximum leads per day (leave empty for unlimited)</p>
          </div>

          <Separator />

          {/* Filter Configuration */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Filter Configuration</h3>
              <p className="text-sm text-muted-foreground">Set criteria for the types of leads you want to receive</p>
            </div>

            {/* States Multi-Select */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>States (multi-select)</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={selectAllStates}>
                    Select All
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={deselectAllStates}>
                    Deselect All
                  </Button>
                </div>
              </div>

              <div className="border border-input rounded-md p-3 max-h-48 overflow-y-auto">
                <div className="grid grid-cols-6 gap-2">
                  {US_STATES.map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => toggleState(state)}
                      className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                        selectedStates.includes(state)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {selectedStates.length > 0 ? (
                  selectedStates.map((state) => (
                    <Badge key={state} variant="secondary" className="gap-1">
                      {state}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleState(state)} />
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No states selected</p>
                )}
              </div>
            </div>

            {/* Age Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ageMin">Min Age</Label>
                <Input id="ageMin" type="number" placeholder="e.g. 25" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageMax">Max Age</Label>
                <Input id="ageMax" type="number" placeholder="e.g. 65" />
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
              >
                <option>Any</option>
                <option>English</option>
                <option>Spanish</option>
                <option>Portuguese</option>
              </select>
            </div>

            {/* Smoker Status */}
            <div className="space-y-2">
              <Label htmlFor="smoker">Smoker Status</Label>
              <select
                id="smoker"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
              >
                <option>Any</option>
                <option>Non-smoker</option>
                <option>Smoker</option>
              </select>
            </div>

            {/* Coverage Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coverageMin">Min Coverage</Label>
                <Input id="coverageMin" type="number" placeholder="e.g. 100000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverageMax">Max Coverage</Label>
                <Input id="coverageMax" type="number" placeholder="e.g. 500000" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Lead Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
