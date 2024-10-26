/*
  Warnings:

  - Changed the type of `current_plan` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('gold', 'platinum', 'diamond');

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "current_plan",
ADD COLUMN     "current_plan" "Plan" NOT NULL;
