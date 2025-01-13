/*
  Warnings:

  - The `storage_size` column on the `VideoClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "used_storage" SET DEFAULT 0,
ALTER COLUMN "used_storage" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "VideoClass" DROP COLUMN "storage_size",
ADD COLUMN     "storage_size" DOUBLE PRECISION;
