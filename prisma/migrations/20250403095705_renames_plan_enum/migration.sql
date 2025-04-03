/*
  Warnings:

  - The values [bronze,silver,gold] on the enum `Plan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Plan_new" AS ENUM ('bronze_mensal', 'silver_mensal', 'gold_mensal', 'bronze_anual', 'silver_anual', 'gold_anual');
ALTER TABLE "Company" ALTER COLUMN "current_plan" TYPE "Plan_new" USING ("current_plan"::text::"Plan_new");
ALTER TYPE "Plan" RENAME TO "Plan_old";
ALTER TYPE "Plan_new" RENAME TO "Plan";
DROP TYPE "Plan_old";
COMMIT;
