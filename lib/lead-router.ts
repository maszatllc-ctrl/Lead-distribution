import { prisma } from "@/lib/prisma"
import { LeadStatus, WalletTransactionType } from "@prisma/client"

export async function autoAssignLead(leadId: string) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  })

  if (!lead) throw new Error("Lead not found")
  if (lead.status !== LeadStatus.unassigned) return lead

  const campaigns = await prisma.campaign.findMany({
    where: {
      status: "active",
      leadTypes: { has: lead.leadType },
      states: { has: lead.state },
      buyer: {
        sellerId: lead.sellerId,
        status: "active",
        walletBalance: { gte: lead.price },
      },
      OR: [
        { maxPrice: null },
        { maxPrice: { gte: lead.price } },
      ],
    },
    include: {
      buyer: true,
    },
  })

  if (campaigns.length === 0) return lead

  // Strategy: choose buyer with highest wallet balance to prefer well-funded buyers
  const sorted = campaigns.sort((a, b) => Number(b.buyer.walletBalance) - Number(a.buyer.walletBalance))
  const chosen = sorted[0]
  return assignLeadToBuyer(lead.id, chosen.buyerId)
}

export async function assignLeadToBuyer(leadId: string, buyerId: string) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  if (!lead) throw new Error("Lead not found")
  if (lead.status === LeadStatus.sold && lead.assignedBuyerId === buyerId) return lead

  const buyer = await prisma.buyer.findUnique({ where: { id: buyerId } })
  if (!buyer) throw new Error("Buyer not found")
  if (buyer.status !== "active") throw new Error("Buyer is not active")
  if (buyer.walletBalance < lead.price) throw new Error("Insufficient wallet balance")

  return prisma.$transaction(async (tx) => {
    const updatedBuyer = await tx.buyer.update({
      where: { id: buyerId },
      data: { walletBalance: { decrement: lead.price } },
    })

    const purchase = await tx.leadPurchase.create({
      data: {
        buyerId,
        leadId,
        price: lead.price,
      },
    })

    await tx.walletTransaction.create({
      data: {
        buyerId,
        amount: -lead.price,
        type: WalletTransactionType.debit,
        reason: "lead_purchase",
        meta: { leadId },
      },
    })

    const updatedLead = await tx.lead.update({
      where: { id: leadId },
      data: {
        status: LeadStatus.sold,
        assignedBuyerId: buyerId,
      },
    })

    return { lead: updatedLead, buyer: updatedBuyer, purchase }
  })
}
