import { NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { BuyerStatus, Role } from "@prisma/client"

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  status: z.nativeEnum(BuyerStatus).optional(),
})

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const buyer = await prisma.buyer.findFirst({
    where: { id: params.id, seller: { userId: session.user.id } },
    include: {
      campaigns: true,
      purchases: { include: { lead: true } },
      wallet: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  })

  if (!buyer) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(buyer)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const buyer = await prisma.buyer.update({
    where: { id: params.id, sellerId: seller.id },
    data: parsed.data,
  })
  return NextResponse.json(buyer)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  await prisma.buyer.delete({ where: { id: params.id, sellerId: seller.id } })
  return NextResponse.json({ success: true })
}
