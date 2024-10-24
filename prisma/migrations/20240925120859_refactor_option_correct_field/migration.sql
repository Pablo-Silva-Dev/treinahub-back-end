/*
  Warnings:

  - You are about to drop the column `correct_option_id` on the `Question` table. All the data in the column will be lost.
  - Added the required column `is_correct` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "is_correct" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correct_option_id";
