"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Filter, Users, Wallet, Settings, TrendingUp, LogOut, Database } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"

interface DashboardLayoutProps {
  children: ReactNode
  userType: "buyer" | "seller"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { data } = useSession()

  const buyerNavItems = [
    { href: "/buyer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/buyer/campaigns", label: "Lead Filters", icon: Filter },
    { href: "/buyer/leads", label: "Leads", icon: Users },
    { href: "/buyer/wallet", label: "Wallet", icon: Wallet },
    { href: "/buyer/settings", label: "Settings", icon: Settings },
  ]

  const sellerNavItems = [
    { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
    { href: "/seller/buyers", label: "Buyers", icon: Users },
    { href: "/seller/leads", label: "Leads", icon: Database },
    { href: "/seller/campaigns", label: "Lead Filters", icon: Filter },
    { href: "/seller/billing", label: "Billing", icon: Wallet },
    { href: "/seller/settings", label: "Settings", icon: Settings },
  ]

  const navItems = userType === "buyer" ? buyerNavItems : sellerNavItems

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" })
  }

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground">LeadFlow</h1>
              <p className="text-xs text-muted-foreground capitalize">{userType}</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 w-full rounded-lg">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs font-semibold">{(data?.user?.name?.[0] || userType[0]).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-foreground truncate">
                {data?.user?.name || (userType === "buyer" ? "Buyer Account" : "Seller Account")}
              </p>
              <p className="text-xs text-muted-foreground truncate">{data?.user?.email || `${userType}@leadflow.com`}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
