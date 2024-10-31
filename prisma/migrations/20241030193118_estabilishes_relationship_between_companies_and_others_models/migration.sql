/*
  Warnings:

  - Added the required column `company_id` to the `ContactSupport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `FaqQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactSupport" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FaqQuestion" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FaqQuestion" ADD CONSTRAINT "FaqQuestion_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactSupport" ADD CONSTRAINT "ContactSupport_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
