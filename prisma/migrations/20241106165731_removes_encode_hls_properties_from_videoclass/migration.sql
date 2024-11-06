/*
  Warnings:

  - You are about to drop the column `hls_encoding_id` on the `VideoClass` table. All the data in the column will be lost.
  - You are about to drop the column `hls_encoding_url` on the `VideoClass` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VideoClass" DROP COLUMN "hls_encoding_id",
DROP COLUMN "hls_encoding_url";
