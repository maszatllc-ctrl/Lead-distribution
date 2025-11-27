import { NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { LeadStatus, Role } from "@prisma/client"
import { autoAssignLead } from "@/lib/lead-router"

const leadSchema = z.object({
  leadType: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  state: z.string(),
  price: z.number(),
  source: z.string().optional(),
})

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status") as LeadStatus | null

  const leads = await prisma.lead.findMany({
    where: {
      sellerId: seller.id,
      status: status ?? undefined,
    },
    include: { assignedBuyer: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(leads)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  const body = await req.json()
  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const lead = await prisma.lead.create({
    data: {
      ...parsed.data,
      sellerId: seller.id,
      status: LeadStatus.unassigned,
    },
  })

  // Attempt auto assignment
  await autoAssignLead(lead.id)

  return NextResponse.json(lead)
}
