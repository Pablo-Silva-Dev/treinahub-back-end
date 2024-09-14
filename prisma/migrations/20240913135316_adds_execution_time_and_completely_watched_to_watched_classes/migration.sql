/*
  Warnings:

  - Added the required column `completely_watched` to the `WatchedClasses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchedClasses" ADD COLUMN     "completely_watched" BOOLEAN NOT NULL,
ADD COLUMN     "execution_time" INTEGER NOT NULL DEFAULT 0;
