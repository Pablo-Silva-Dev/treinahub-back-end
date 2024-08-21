-- AlterTable
ALTER TABLE "VideoClass" ADD COLUMN     "video_url" TEXT,
ALTER COLUMN "dash_encoding_url" DROP NOT NULL,
ALTER COLUMN "hls_encoding_url" DROP NOT NULL;
