import { PrismaService } from "../services/prisma";
import { faqQuestionsSeeds } from "./faqQuestionsSeeds";

const prisma = new PrismaService();

async function plantSeeds(seeds: any[]) {
  seeds.forEach(async (seed) => {
    const plantedSeed = await prisma.faqQuestion.create({ data: seed });
    console.log("Seeds planted.");
    console.log(plantedSeed);
  });
}

plantSeeds(faqQuestionsSeeds)
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
