/*
  Warnings:

  - Added the required column `status` to the `VideoClass` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PandaVideoStatus" AS ENUM ('CONVERTED', 'CONVERTING', 'FAILED');

-- DropIndex
DROP INDEX "Training_name_key";

-- AlterTable
ALTER TABLE "VideoClass" ADD COLUMN     "status" "PandaVideoStatus" NOT NULL;
