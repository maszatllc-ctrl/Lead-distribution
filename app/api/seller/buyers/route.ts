import { NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Role, BuyerStatus } from "@prisma/client"

const buyerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  status: z.nativeEnum(BuyerStatus).optional(),
  walletBalance: z.number().optional(),
})

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  const buyers = await prisma.buyer.findMany({
    where: { sellerId: seller.id },
    include: {
      _count: { select: { purchases: true } },
    },
  })

  return NextResponse.json(buyers)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  const body = await req.json()
  const parsed = buyerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const buyer = await prisma.buyer.create({
    data: {
      sellerId: seller.id,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      status: parsed.data.status ?? BuyerStatus.active,
      walletBalance: parsed.data.walletBalance ?? 0,
    },
  })

  return NextResponse.json(buyer)
}
