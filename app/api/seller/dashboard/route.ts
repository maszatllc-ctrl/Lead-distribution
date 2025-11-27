import { NextResponse } from "next/server"
import { subDays, formatISO } from "date-fns"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const since = subDays(new Date(), 30)
  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  const [revenueAgg, leadsSold, unassigned, activeBuyers, purchases] = await Promise.all([
    prisma.leadPurchase.aggregate({
      _sum: { price: true },
      where: { lead: { sellerId: seller.id, purchasedAt: { gte: since } } },
    }),
    prisma.leadPurchase.count({ where: { lead: { sellerId: seller.id, purchasedAt: { gte: since } } } }),
    prisma.lead.count({ where: { sellerId: seller.id, status: "unassigned" } }),
    prisma.buyer.count({ where: { sellerId: seller.id, status: "active" } }),
    prisma.leadPurchase.findMany({
      where: { lead: { sellerId: seller.id } },
      orderBy: { purchasedAt: "desc" },
      take: 10,
      include: {
        lead: true,
        buyer: true,
      },
    }),
  ])

  const revenueByDay = purchasesForRange(seller.id, since)

  return NextResponse.json({
    revenue: revenueAgg._sum.price || 0,
    leadsSold,
    unassigned,
    activeBuyers,
    revenueByDay: await revenueByDay,
    recent: purchases,
  })
}

async function purchasesForRange(sellerId: string, since: Date) {
  const purchases = await prisma.leadPurchase.findMany({
    where: { lead: { sellerId, purchasedAt: { gte: since } } },
    select: { purchasedAt: true, price: true },
  })

  const map = new Map<string, number>()
  purchases.forEach((p) => {
    const day = formatISO(p.purchasedAt, { representation: "date" })
    map.set(day, Number((map.get(day) || 0) + Number(p.price)))
  })

  return Array.from(map.entries())
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => (a.date < b.date ? -1 : 1))
}
