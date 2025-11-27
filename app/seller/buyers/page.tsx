"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Buyer {
  id: string
  name: string
  walletBalance: number
  status: "active" | "paused" | "disabled"
  _count: { purchases: number }
}

export default function SellerBuyers() {
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [selectedBuyerIds, setSelectedBuyerIds] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/seller/buyers")
      if (res.ok) {
        const data = await res.json()
        setBuyers(data)
      }
    }
    load()
  }, [])

  const toggleStatus = async (id: string) => {
    const buyer = buyers.find((b) => b.id === id)
    if (!buyer) return
    const nextStatus = buyer.status === "active" ? "paused" : "active"
    const res = await fetch(`/api/seller/buyers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    })
    if (res.ok) {
      const updated = await res.json()
      setBuyers(buyers.map((b) => (b.id === id ? updated : b)))
    }
  }

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBuyerIds(buyers.map((b) => b.id))
    } else {
      setSelectedBuyerIds([])
    }
  }

  const toggleSelectBuyer = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedBuyerIds([...selectedBuyerIds, id])
    } else {
      setSelectedBuyerIds(selectedBuyerIds.filter((buyerId) => buyerId !== id))
    }
  }

  const handleDeleteSelected = async () => {
    await Promise.all(selectedBuyerIds.map((id) => fetch(`/api/seller/buyers/${id}`, { method: "DELETE" })))
    setBuyers(buyers.filter((buyer) => !selectedBuyerIds.includes(buyer.id)))
    setSelectedBuyerIds([])
  }

  const handleAddBuyer = async () => {
    const name = prompt("Buyer name")
    const email = name ? prompt("Buyer email") : null
    if (!name || !email) return
    const res = await fetch("/api/seller/buyers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
    if (res.ok) {
      const created = await res.json()
      setBuyers([created, ...buyers])
    }
  }

  return (
    <DashboardLayout userType="seller">
      <div className="p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Buyers</h1>
            <p className="text-muted-foreground mt-1">Manage your buyers and their accounts.</p>
          </div>
          <Button className="gap-2" onClick={handleAddBuyer}>
            <Plus className="w-4 h-4" />
            Add Buyer
          </Button>
        </div>

        <Card className="p-6">
          {selectedBuyerIds.length > 0 && (
            <div className="mb-4 flex items-center gap-3">
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected} className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete {selectedBuyerIds.length} {selectedBuyerIds.length === 1 ? "buyer" : "buyers"}
              </Button>
            </div>
          )}

          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedBuyerIds.length === buyers.length && buyers.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Buyer Name</TableHead>
                  <TableHead className="font-semibold">Wallet Balance</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Leads Purchased</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buyers.map((buyer) => (
                  <TableRow key={buyer.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Checkbox
                        checked={selectedBuyerIds.includes(buyer.id)}
                        onCheckedChange={(checked) => toggleSelectBuyer(buyer.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{buyer.name}</TableCell>
                    <TableCell className="font-semibold text-foreground">${buyer.walletBalance.toFixed(2)}</TableCell>
                    <TableCell>
                      <Switch checked={buyer.status === "active"} onCheckedChange={() => toggleStatus(buyer.id)} />
                    </TableCell>
                    <TableCell className="text-foreground">{buyer._count.purchases}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/seller/buyers/${buyer.id}`}>
                          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                        </Link>
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
