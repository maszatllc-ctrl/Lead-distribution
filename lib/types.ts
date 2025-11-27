export interface Lead {
  id: string
  title: string
  category: string
  quality: "hot" | "warm" | "cold"
  price: number
  quantity: number
  seller?: string
  date: string
  status?: "available" | "purchased" | "pending"
  description?: string
}

export interface Buyer {
  id: string
  name: string
  company: string
  totalPurchases: number
  totalSpent: number
  lastPurchase: string
  status: "active" | "inactive"
}

export type UserType = "buyer" | "seller"
