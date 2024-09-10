/*
  Warnings:

  - Added the required column `email` to the `ContactSupport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactSupport" ADD COLUMN     "email" TEXT NOT NULL;
