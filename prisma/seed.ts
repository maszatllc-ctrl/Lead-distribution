import { PrismaClient, Role, BuyerStatus, CampaignStatus, LeadStatus, WalletTransactionType } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const sellerUser = await prisma.user.upsert({
    where: { email: "seller@example.com" },
    update: {},
    create: {
      email: "seller@example.com",
      name: "Demo Seller",
      role: Role.seller,
      seller: {
        create: {
          companyName: "Demo Seller Co",
        },
      },
    },
    include: { seller: true },
  })

  const seller = sellerUser.seller!

  const buyers = await prisma.buyer.createMany({
    data: [
      {
        sellerId: seller.id,
        name: "Alpha Insurance",
        email: "alpha@example.com",
        phone: "555-0001",
        status: BuyerStatus.active,
        walletBalance: 500,
      },
      {
        sellerId: seller.id,
        name: "Beta Coverage",
        email: "beta@example.com",
        phone: "555-0002",
        status: BuyerStatus.active,
        walletBalance: 150,
      },
    ],
  })

  const buyerRecords = await prisma.buyer.findMany({ where: { sellerId: seller.id } })

  await Promise.all(
    buyerRecords.map((buyer) =>
      prisma.campaign.create({
        data: {
          buyerId: buyer.id,
          name: `${buyer.name} Default`,
          status: CampaignStatus.active,
          leadTypes: ["Term Life", "Final Expense"],
          states: ["CA", "TX", "NY"],
          maxPrice: 75,
          dailyCap: 20,
        },
      }),
    ),
  )

  const leads = await prisma.lead.createMany({
    data: [
      {
        sellerId: seller.id,
        leadType: "Term Life",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "555-1000",
        state: "CA",
        price: 50,
        status: LeadStatus.unassigned,
      },
      {
        sellerId: seller.id,
        leadType: "Final Expense",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "555-1001",
        state: "TX",
        price: 35,
        status: LeadStatus.unassigned,
      },
    ],
  })

  const firstBuyer = buyerRecords[0]
  const leadForPurchase = await prisma.lead.create({
    data: {
      sellerId: seller.id,
      leadType: "Medicare",
      firstName: "Alice",
      lastName: "Lee",
      email: "alice.lee@example.com",
      phone: "555-1002",
      state: "NY",
      price: 60,
      status: LeadStatus.sold,
      assignedBuyerId: firstBuyer.id,
    },
  })

  await prisma.leadPurchase.create({
    data: {
      buyerId: firstBuyer.id,
      leadId: leadForPurchase.id,
      price: leadForPurchase.price,
    },
  })

  await prisma.walletTransaction.create({
    data: {
      buyerId: firstBuyer.id,
      amount: -leadForPurchase.price,
      type: WalletTransactionType.debit,
      reason: "lead_purchase",
    },
  })

  await prisma.buyer.update({
    where: { id: firstBuyer.id },
    data: { walletBalance: { decrement: leadForPurchase.price } },
  })

  console.log("Seed data created")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
