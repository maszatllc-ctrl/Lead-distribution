"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Eye, Trash2, Calendar, Filter } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface Lead {
  id: string
  type: string
  name: string
  phone: string
  email: string
  state: string
  buyer: string
  price: number
  status: "delivered" | "unassigned"
  timestamp: string
  age?: number
  coverage?: string
  smoker?: string
  language?: string
}

const mockLeads: Lead[] = [
  {
    id: "1",
    type: "Term Life",
    name: "John Smith",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    state: "TX",
    buyer: "ABC Insurance",
    price: 45.0,
    status: "delivered",
    timestamp: "2025-01-26 14:32",
    age: 42,
    coverage: "$500,000",
    smoker: "No",
    language: "English",
  },
  {
    id: "2",
    type: "Final Expense",
    name: "Sarah Johnson",
    phone: "(555) 234-5678",
    email: "sarah.j@email.com",
    state: "FL",
    buyer: "XYZ Agency",
    price: 38.5,
    status: "delivered",
    timestamp: "2025-01-26 13:15",
    age: 68,
    coverage: "$15,000",
    smoker: "No",
    language: "English",
  },
  {
    id: "3",
    type: "Medicare",
    name: "Michael Chen",
    phone: "(555) 345-6789",
    email: "mchen@email.com",
    state: "CA",
    buyer: "Unassigned",
    price: 52.0,
    status: "unassigned",
    timestamp: "2025-01-26 11:48",
    age: 66,
    coverage: "N/A",
    smoker: "No",
    language: "English",
  },
  {
    id: "4",
    type: "Term Life",
    name: "Emily Davis",
    phone: "(555) 456-7890",
    email: "emily.davis@email.com",
    state: "NY",
    buyer: "Best Leads Co",
    price: 45.0,
    status: "delivered",
    timestamp: "2025-01-26 10:22",
    age: 35,
    coverage: "$750,000",
    smoker: "No",
    language: "English",
  },
]

export default function SellerLeads() {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [filterType, setFilterType] = useState("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([])

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setSheetOpen(true)
  }

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeadIds(leads.map((l) => l.id))
    } else {
      setSelectedLeadIds([])
    }
  }

  const toggleSelectLead = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLeadIds([...selectedLeadIds, id])
    } else {
      setSelectedLeadIds(selectedLeadIds.filter((leadId) => leadId !== id))
    }
  }

  const handleDeleteSelected = () => {
    setLeads(leads.filter((lead) => !selectedLeadIds.includes(lead.id)))
    setSelectedLeadIds([])
  }

  return (
    <DashboardLayout userType="seller">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Master list of all leads with filtering and assignment management.
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {selectedLeadIds.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected} className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete {selectedLeadIds.length} {selectedLeadIds.length === 1 ? "lead" : "leads"}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px] gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="term">Term Life</SelectItem>
                  <SelectItem value="final">Final Expense</SelectItem>
                  <SelectItem value="medicare">Medicare</SelectItem>
                  <SelectItem value="mortgage">Mortgage Protection</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Calendar className="w-4 h-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      "Date Range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => setDateRange(range || {})}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              {selectedLeadIds.length > 0 && <Button variant="outline">Export</Button>}
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedLeadIds.length === leads.length && leads.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Lead Type</TableHead>
                  <TableHead className="font-semibold">Lead Name</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">State</TableHead>
                  <TableHead className="font-semibold">Assigned Buyer</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/30 cursor-pointer">
                    <TableCell>
                      <Checkbox
                        checked={selectedLeadIds.includes(lead.id)}
                        onCheckedChange={(checked) => toggleSelectLead(lead.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{lead.type}</TableCell>
                    <TableCell className="text-foreground">{lead.name}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                    <TableCell className="text-foreground">{lead.state}</TableCell>
                    <TableCell className="text-foreground">{lead.buyer}</TableCell>
                    <TableCell className="font-semibold text-foreground">${lead.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          lead.status === "delivered"
                            ? "bg-green-500/10 text-green-600 border-green-500/20"
                            : "bg-orange-500/10 text-orange-600 border-orange-500/20"
                        }
                      >
                        {lead.status === "delivered" ? "Delivered" : "Unassigned"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                          onClick={() => openLeadDetails(lead)}
                        >
                          <Eye className="w-4 h-4" />
                          View
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

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Lead Details</SheetTitle>
            <SheetDescription>View and edit full lead information</SheetDescription>
          </SheetHeader>
          {selectedLead && (
            <div className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Lead Name</Label>
                  <Input value={selectedLead.name} readOnly />
                </div>

                <div className="grid gap-2">
                  <Label>Lead Type</Label>
                  <Input value={selectedLead.type} readOnly />
                </div>

                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input value={selectedLead.phone} readOnly />
                </div>

                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={selectedLead.email} readOnly />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>State</Label>
                    <Input value={selectedLead.state} readOnly />
                  </div>

                  <div className="grid gap-2">
                    <Label>Age</Label>
                    <Input value={selectedLead.age} readOnly />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Coverage Amount</Label>
                  <Input value={selectedLead.coverage} readOnly />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Smoker</Label>
                    <Input value={selectedLead.smoker} readOnly />
                  </div>

                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <Input value={selectedLead.language} readOnly />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Assigned Buyer</Label>
                  <Select defaultValue={selectedLead.buyer.toLowerCase().replace(" ", "-")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="abc-insurance">ABC Insurance</SelectItem>
                      <SelectItem value="xyz-agency">XYZ Agency</SelectItem>
                      <SelectItem value="best-leads-co">Best Leads Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Price</Label>
                    <Input value={`$${selectedLead.price.toFixed(2)}`} readOnly />
                  </div>

                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Badge
                      variant="outline"
                      className={
                        selectedLead.status === "delivered"
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : "bg-orange-500/10 text-orange-600 border-orange-500/20"
                      }
                    >
                      {selectedLead.status === "delivered" ? "Delivered" : "Unassigned"}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Delivery Log</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Lead created: {selectedLead.timestamp}</p>
                    {selectedLead.status === "delivered" && (
                      <p>
                        • Delivered to {selectedLead.buyer}: {selectedLead.timestamp}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Save Changes</Button>
                <Button variant="outline" onClick={() => setSheetOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  )
}
