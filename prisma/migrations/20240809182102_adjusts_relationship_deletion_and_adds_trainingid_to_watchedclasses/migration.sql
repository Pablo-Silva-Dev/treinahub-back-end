/*
  Warnings:

  - The primary key for the `WatchedClasses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `training_id` to the `WatchedClasses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_user_id_fkey";

-- DropForeignKey
ALTER TABLE "VideoClass" DROP CONSTRAINT "VideoClass_training_id_fkey";

-- DropForeignKey
ALTER TABLE "WatchedClasses" DROP CONSTRAINT "WatchedClasses_user_id_fkey";

-- AlterTable
ALTER TABLE "WatchedClasses" DROP CONSTRAINT "WatchedClasses_pkey",
ADD COLUMN     "training_id" TEXT NOT NULL,
ADD CONSTRAINT "WatchedClasses_pkey" PRIMARY KEY ("user_id", "videoclass_id", "training_id");

-- AddForeignKey
ALTER TABLE "VideoClass" ADD CONSTRAINT "VideoClass_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedClasses" ADD CONSTRAINT "WatchedClasses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedClasses" ADD CONSTRAINT "WatchedClasses_videoclass_id_fkey" FOREIGN KEY ("videoclass_id") REFERENCES "VideoClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
