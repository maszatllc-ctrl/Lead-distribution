import { NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { LeadStatus, Role } from "@prisma/client"
import { assignLeadToBuyer } from "@/lib/lead-router"

const updateSchema = z.object({
  leadType: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  state: z.string().optional(),
  price: z.number().optional(),
  status: z.nativeEnum(LeadStatus).optional(),
  assignedBuyerId: z.string().nullable().optional(),
})

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const lead = await prisma.lead.findFirst({ where: { id: params.id, seller: { userId: session.user.id } }, include: { assignedBuyer: true } })
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(lead)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const data = parsed.data
  if (data.assignedBuyerId) {
    await assignLeadToBuyer(params.id, data.assignedBuyerId)
  }

  const lead = await prisma.lead.update({ where: { id: params.id, sellerId: seller.id }, data })
  return NextResponse.json(lead)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  await prisma.lead.delete({ where: { id: params.id, sellerId: seller.id } })
  return NextResponse.json({ success: true })
}
