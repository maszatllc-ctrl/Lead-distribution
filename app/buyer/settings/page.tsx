"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BuyerSettings() {
  const [isGoogleConnected, setIsGoogleConnected] = useState(true)
  const [webhookCopied, setWebhookCopied] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  const handleCopyWebhook = () => {
    setWebhookCopied(true)
    setTimeout(() => setWebhookCopied(false), 2000)
  }

  return (
    <DashboardLayout userType="buyer">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
                <p className="text-sm text-muted-foreground mt-1">Update your personal details</p>
              </div>

              <Separator />

              <div className="grid gap-6 max-w-2xl">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="buyer@example.com" defaultValue="buyer@leadflow.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <Separator />

              {/* Authentication Section */}
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Authentication</h3>
                  <p className="text-sm text-muted-foreground">Manage your login methods</p>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background border border-border rounded flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Google</p>
                      <p className="text-sm text-muted-foreground">
                        {isGoogleConnected ? "Connected" : "Not connected"}
                      </p>
                    </div>
                  </div>
                  {isGoogleConnected ? (
                    <Badge variant="secondary">Connected</Badge>
                  ) : (
                    <Button size="sm">Connect Google</Button>
                  )}
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Change Password
                </Button>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose how you want to be notified</p>
              </div>

              <Separator />

              <div className="space-y-6 max-w-2xl">
                {/* Email Notifications */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get email alerts about new leads and account changes.
                    </p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <Separator />

                {/* SMS Notifications */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get SMS alerts about low balance and new leads.</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Preferences</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">GoHighLevel / CRM Integration</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect your CRM to automatically receive new leads
                </p>
              </div>

              <Separator />

              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="webhook">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook"
                      placeholder="https://your-crm.com/webhook/leads"
                      defaultValue="https://gohighlevel.com/webhook/abc123"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyWebhook}
                      className="shrink-0 bg-transparent"
                    >
                      {webhookCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">We will POST each new lead to this URL in real-time.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key / Auth Token (optional)</Label>
                  <Input id="apiKey" type="password" placeholder="Enter your API key or auth token" />
                  <p className="text-xs text-muted-foreground">
                    If your webhook requires authentication, enter your credentials here.
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-medium text-foreground">Webhook Payload Example</p>
                  <pre className="text-xs text-muted-foreground overflow-x-auto">
                    {`{
  "lead_id": "abc123",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "type": "Term Life",
  "state": "CA",
  "age": 35,
  "timestamp": "2025-01-20T15:32:00Z"
}`}
                  </pre>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Test Integration
                </Button>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Integration</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
