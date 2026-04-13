import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hashPassword("EvolveWealth2026");

  const user = await prisma.user.upsert({
    where: { email: "arjun@demo.com" },
    update: {
      passwordHash,
      name: "Arjun Mehta",
      phone: "9876543210",
      streakDays: 47,
      tier: "Wealth Builder",
      xp: 820,
      growthScore: 724
    },
    create: {
      email: "arjun@demo.com",
      passwordHash,
      name: "Arjun Mehta",
      phone: "9876543210",
      streakDays: 47,
      tier: "Wealth Builder",
      xp: 820,
      growthScore: 724
    }
  });

  const portfolio = await prisma.portfolio.upsert({
    where: { userId: user.id },
    update: { totalValue: 11780 },
    create: { userId: user.id, totalValue: 11780 }
  });

  await prisma.holding.deleteMany({ where: { portfolioId: portfolio.id } });
  await prisma.transaction.deleteMany({ where: { userId: user.id } });
  await prisma.userMilestone.deleteMany({ where: { userId: user.id } });
  await prisma.milestone.deleteMany();

  await prisma.holding.createMany({
    data: [
      { portfolioId: portfolio.id, asset: "Digital Gold", amount: 4230, units: 7.4, returnPct: 18.2 },
      { portfolioId: portfolio.id, asset: "Nifty 50 ETF", amount: 2890, units: 16.3, returnPct: 12.4 },
      { portfolioId: portfolio.id, asset: "Silver Index", amount: 1560, units: 22.6, returnPct: 6.1 },
      { portfolioId: portfolio.id, asset: "US Tech Fund", amount: 3100, units: 10.2, returnPct: 22.8 }
    ]
  });

  const milestones = await Promise.all([
    prisma.milestone.create({ data: { title: "Seed Planted", description: "First ₹100 invested", xpReward: 50, unlockCriteria: "Invest ₹100" } }),
    prisma.milestone.create({ data: { title: "Sapling Stage", description: "30-day streak achieved", xpReward: 120, unlockCriteria: "Maintain a 30-day streak" } }),
    prisma.milestone.create({ data: { title: "Wealth Builder", description: "Portfolio crossed ₹10,000", xpReward: 300, unlockCriteria: "Reach ₹10,000 portfolio" } }),
    prisma.milestone.create({ data: { title: "Freedom Fighter", description: "Reach ₹1L portfolio", xpReward: 600, unlockCriteria: "Reach ₹1,00,000 portfolio" } }),
    prisma.milestone.create({ data: { title: "Empire Mode", description: "₹10L+ wealth achieved", xpReward: 2000, unlockCriteria: "Reach ₹10,00,000 portfolio" } })
  ]);

  await prisma.userMilestone.createMany({
    data: milestones.map((milestone, index) => ({
      userId: user.id,
      milestoneId: milestone.id,
      unlocked: index < 3,
      unlockedAt: index < 3 ? new Date() : null
    }))
  });

  const merchants = [
    ["Starbucks", "coffee", 196, 4, "Digital Gold"],
    ["Zomato", "food_delivery", 243, 7, "Nifty 50 ETF"],
    ["Myntra", "shopping", 487, 3, "Silver Index"],
    ["Steam", "gaming", 932, 18, "US Tech Fund"],
    ["Cult.fit", "fitness", 355, 5, "Nifty 50 ETF"],
    ["BookMyShow", "entertainment", 198, 2, "Digital Gold"]
  ] as const;

  await prisma.transaction.createMany({
    data: Array.from({ length: 20 }, (_, index) => {
      const [merchantName, category, amount, roundUp, asset] = merchants[index % merchants.length];
      return {
        userId: user.id,
        merchantName,
        category,
        amount,
        roundUp,
        asset,
        createdAt: new Date(Date.now() - index * 1000 * 60 * 60 * 12)
      };
    })
  });

  await prisma.growthScoreHistory.create({
    data: { userId: user.id, score: 724 }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
