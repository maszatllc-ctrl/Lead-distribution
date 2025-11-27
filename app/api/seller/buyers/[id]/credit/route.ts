import { NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Role, WalletTransactionType } from "@prisma/client"

const bodySchema = z.object({
  amount: z.number().positive(),
  reason: z.string().default("manual_credit"),
})

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== Role.seller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const seller = await prisma.seller.findUnique({ where: { userId: session.user.id } })
  if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 })

  const body = await req.json()
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const result = await prisma.$transaction(async (tx) => {
    const buyer = await tx.buyer.update({
      where: { id: params.id, sellerId: seller.id },
      data: { walletBalance: { increment: parsed.data.amount } },
    })

    await tx.walletTransaction.create({
      data: {
        buyerId: buyer.id,
        amount: parsed.data.amount,
        type: WalletTransactionType.credit,
        reason: parsed.data.reason,
      },
    })

    return buyer
  })

  return NextResponse.json(result)
}
