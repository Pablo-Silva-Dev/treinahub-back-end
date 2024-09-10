/*
  Warnings:

  - You are about to drop the column `dash_encoding_id` on the `VideoClass` table. All the data in the column will be lost.
  - You are about to drop the column `dash_encoding_url` on the `VideoClass` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VideoClass" DROP COLUMN "dash_encoding_id",
DROP COLUMN "dash_encoding_url";
