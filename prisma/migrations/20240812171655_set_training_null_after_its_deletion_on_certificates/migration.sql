-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_training_id_fkey";

-- AlterTable
ALTER TABLE "Certificate" ALTER COLUMN "training_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;
