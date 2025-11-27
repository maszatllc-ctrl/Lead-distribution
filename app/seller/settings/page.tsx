"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Copy, CheckCircle2, XCircle } from "lucide-react"

const leadSources = [
  { id: "1", name: "Facebook Ads", webhookUrl: "https://api.leadflow.com/webhook/fb-ads-123", status: "active" },
  { id: "2", name: "Google Ads", webhookUrl: "https://api.leadflow.com/webhook/google-ads-456", status: "active" },
  { id: "3", name: "Website Form", webhookUrl: "https://api.leadflow.com/webhook/website-789", status: "inactive" },
]

const teamMembers = [
  { id: "1", name: "John Smith", email: "john@leadflow.com", role: "Admin", status: "active" },
  { id: "2", name: "Sarah Johnson", email: "sarah@leadflow.com", role: "Manager", status: "active" },
  { id: "3", name: "Mike Wilson", email: "mike@leadflow.com", role: "Viewer", status: "pending" },
]

export default function SellerSettings() {
  const [routingMode, setRoutingMode] = useState("round-robin")
  const [stripeConnected, setStripeConnected] = useState(true)
  const [showAddSource, setShowAddSource] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])
  const [members, setMembers] = useState(teamMembers)

  const toggleSelectAllMembers = (checked: boolean) => {
    if (checked) {
      setSelectedMemberIds(members.map((m) => m.id))
    } else {
      setSelectedMemberIds([])
    }
  }

  const toggleSelectMember = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMemberIds([...selectedMemberIds, id])
    } else {
      setSelectedMemberIds(selectedMemberIds.filter((memberId) => memberId !== id))
    }
  }

  const handleDeleteSelectedMembers = () => {
    setMembers(members.filter((member) => !selectedMemberIds.includes(member.id)))
    setSelectedMemberIds([])
  }

  return (
    <DashboardLayout userType="seller">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure distribution rules, integrations, and team access</p>
        </div>

        <Tabs defaultValue="distribution" className="space-y-6">
          <TabsList>
            <TabsTrigger value="distribution">Distribution Rules</TabsTrigger>
            <TabsTrigger value="integrations">Integrations & Lead Sources</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* Distribution Rules Tab */}
          <TabsContent value="distribution" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Default Lead Routing</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure how leads are automatically distributed to buyers
                </p>
              </div>

              <Separator />

              <RadioGroup value={routingMode} onValueChange={setRoutingMode}>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                    <RadioGroupItem value="round-robin" id="round-robin" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="round-robin" className="cursor-pointer font-semibold text-foreground">
                        Round-Robin
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Distribute leads evenly across all eligible buyers in rotation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                    <RadioGroupItem value="priority" id="priority" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="priority" className="cursor-pointer font-semibold text-foreground">
                        Priority-Based
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Send leads to buyers in a predefined priority order
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                    <RadioGroupItem value="first-eligible" id="first-eligible" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="first-eligible" className="cursor-pointer font-semibold text-foreground">
                        First Eligible Buyer
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Send to the first buyer that matches campaign criteria
                      </p>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              <div className="flex justify-end pt-4">
                <Button>Save Distribution Settings</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Integrations & Lead Sources Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Stripe Integration</h2>
                <p className="text-sm text-muted-foreground mt-1">Connect your Stripe account for payment processing</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {stripeConnected ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Stripe</p>
                    <p className="text-sm text-muted-foreground">{stripeConnected ? "Connected" : "Not connected"}</p>
                  </div>
                </div>
                {stripeConnected ? <Button variant="outline">Disconnect</Button> : <Button>Connect Stripe</Button>}
              </div>

              {stripeConnected && (
                <div className="space-y-2">
                  <Label htmlFor="stripe-key">Stripe Secret Key</Label>
                  <Input id="stripe-key" type="password" value="sk_test_••••••••••••••••••••" readOnly />
                </div>
              )}
            </Card>

            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Lead Sources</h2>
                  <p className="text-sm text-muted-foreground mt-1">Manage incoming lead source webhooks</p>
                </div>
                <Dialog open={showAddSource} onOpenChange={setShowAddSource}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Source
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Lead Source</DialogTitle>
                      <DialogDescription>Configure a new incoming lead source webhook</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="source-name">Source Name</Label>
                          <Input id="source-name" placeholder="e.g., Facebook Ads" />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="webhook-url">Incoming Webhook URL</Label>
                          <div className="flex gap-2">
                            <Input id="webhook-url" value="https://api.leadflow.com/webhook/new-source-123" readOnly />
                            <Button variant="outline" size="icon">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Use this URL in your lead source to send leads to LeadFlow
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Label>Field Mapping</Label>
                          <div className="space-y-3 p-4 border border-border rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label className="text-xs text-muted-foreground">Internal Field</Label>
                                <Input value="name" readOnly className="bg-muted" />
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-xs text-muted-foreground">External Field</Label>
                                <Input placeholder="full_name" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <Input value="email" readOnly className="bg-muted" />
                              <Input placeholder="email_address" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <Input value="phone" readOnly className="bg-muted" />
                              <Input placeholder="phone_number" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <Input value="state" readOnly className="bg-muted" />
                              <Input placeholder="state_code" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <Input value="lead_type" readOnly className="bg-muted" />
                              <Input placeholder="category" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowAddSource(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowAddSource(false)}>Add Source</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Separator />

              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Source Name</TableHead>
                      <TableHead className="font-semibold">Webhook URL</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leadSources.map((source) => (
                      <TableRow key={source.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium text-foreground">{source.name}</TableCell>
                        <TableCell className="text-muted-foreground font-mono text-sm">{source.webhookUrl}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              source.status === "active"
                                ? "bg-green-500/10 text-green-600 border-green-500/20"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {source.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2 text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Team Members</h2>
                  <p className="text-sm text-muted-foreground mt-1">Manage team access and permissions</p>
                </div>
                <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>Invite a new team member to your seller account</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="member-email">Email Address</Label>
                        <Input id="member-email" type="email" placeholder="teammate@company.com" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="member-role">Role</Label>
                        <Select defaultValue="viewer">
                          <SelectTrigger id="member-role">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          <strong>Admin:</strong> Full access. <strong>Manager:</strong> Manage leads and buyers.{" "}
                          <strong>Viewer:</strong> View only.
                        </p>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowAddMember(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowAddMember(false)}>Send Invite</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Separator />

              {selectedMemberIds.length > 0 && (
                <div className="flex items-center gap-3">
                  <Button variant="destructive" size="sm" onClick={handleDeleteSelectedMembers} className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Remove {selectedMemberIds.length} {selectedMemberIds.length === 1 ? "member" : "members"}
                  </Button>
                </div>
              )}

              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedMemberIds.length === members.length && members.length > 0}
                          onCheckedChange={toggleSelectAllMembers}
                        />
                      </TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id} className="hover:bg-muted/30">
                        <TableCell>
                          <Checkbox
                            checked={selectedMemberIds.includes(member.id)}
                            onCheckedChange={(checked) => toggleSelectMember(member.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{member.name}</TableCell>
                        <TableCell className="text-muted-foreground">{member.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              member.status === "active"
                                ? "bg-green-500/10 text-green-600 border-green-500/20"
                                : "bg-orange-500/10 text-orange-600 border-orange-500/20"
                            }
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            {member.status === "pending" && (
                              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                Resend Invite
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
