"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Download, Calendar, Phone, Mail, MapPin, Eye } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const mockLeads = [
  {
    id: "1",
    name: "John Smith",
    type: "Term Life",
    state: "CA",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    price: 45.0,
    timestamp: "2025-01-20 15:32",
    age: 35,
    language: "English",
    smoker: "Non-smoker",
    coverage: "$250,000",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    type: "Final Expense",
    state: "TX",
    phone: "(555) 234-5678",
    email: "sarah.j@example.com",
    price: 52.0,
    timestamp: "2025-01-20 14:18",
    age: 62,
    language: "English",
    smoker: "Non-smoker",
    coverage: "$15,000",
  },
  {
    id: "3",
    name: "Michael Brown",
    type: "IUL",
    state: "NY",
    phone: "(555) 345-6789",
    email: "m.brown@example.com",
    price: 68.0,
    timestamp: "2025-01-20 11:45",
    age: 42,
    language: "English",
    smoker: "Smoker",
    coverage: "$500,000",
  },
  {
    id: "4",
    name: "Emily Davis",
    type: "Term Life",
    state: "FL",
    phone: "(555) 456-7890",
    email: "emily.davis@example.com",
    price: 45.0,
    timestamp: "2025-01-19 16:22",
    age: 29,
    language: "Spanish",
    smoker: "Non-smoker",
    coverage: "$100,000",
  },
]

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<(typeof mockLeads)[0] | null>(null)

  const handleExport = () => {
    console.log("[v0] Exporting leads to CSV")
  }

  return (
    <DashboardLayout userType="buyer">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1">View and manage all your purchased leads</p>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
            <select className="h-10 px-3 rounded-md border border-input bg-background text-foreground">
              <option>All Types</option>
              <option>Term Life</option>
              <option>Final Expense</option>
              <option>IUL</option>
              <option>Mortgage Protection</option>
              <option>Whole Life</option>
            </select>
            <Button onClick={handleExport} className="gap-2 ml-auto">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </Card>

        <div className="grid gap-4">
          {mockLeads.map((lead) => (
            <Card key={lead.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg text-foreground">{lead.name}</h3>
                    <Badge variant="secondary">{lead.type}</Badge>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{lead.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{lead.state}</span>
                    <span>•</span>
                    <span>{lead.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="font-semibold text-lg text-foreground">${lead.price.toFixed(2)}</span>

                  {/* View Details Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLead(lead)}
                    className="gap-2 bg-transparent"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lead Detail Dialog */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Lead Details</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-xl text-foreground">{selectedLead.name}</h3>
                  <Badge variant="secondary">{selectedLead.type}</Badge>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium text-foreground">{selectedLead.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Email</p>
                      <p className="font-medium text-foreground">{selectedLead.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">State</p>
                      <p className="font-medium text-foreground">{selectedLead.state}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Price</p>
                      <p className="font-semibold text-foreground">${selectedLead.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Age</p>
                      <p className="font-medium text-foreground">{selectedLead.age}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Language</p>
                      <p className="font-medium text-foreground">{selectedLead.language}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Smoker Status</p>
                      <p className="font-medium text-foreground">{selectedLead.smoker}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Coverage</p>
                      <p className="font-medium text-foreground">{selectedLead.coverage}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground mb-1">Purchased</p>
                      <p className="font-medium text-foreground">{selectedLead.timestamp}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
