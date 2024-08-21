/*
  Warnings:

  - You are about to drop the column `url` on the `VideoClass` table. All the data in the column will be lost.
  - Added the required column `dash_encoding_id` to the `VideoClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dash_encoding_url` to the `VideoClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hls_encoding_id` to the `VideoClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hls_encoding_url` to the `VideoClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideoClass" DROP COLUMN "url",
ADD COLUMN     "dash_encoding_id" TEXT NOT NULL,
ADD COLUMN     "dash_encoding_url" TEXT NOT NULL,
ADD COLUMN     "hls_encoding_id" TEXT NOT NULL,
ADD COLUMN     "hls_encoding_url" TEXT NOT NULL,
ADD COLUMN     "reference_number" SERIAL NOT NULL;
