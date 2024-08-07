-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT,
    "street" TEXT,
    "district" TEXT,
    "city" TEXT,
    "uf" TEXT,
    "residence_number" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "cover_url" TEXT,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "training_id" TEXT NOT NULL,

    CONSTRAINT "VideoClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FaqQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppVersion" (
    "id" TEXT NOT NULL,
    "app_version" TEXT NOT NULL,
    "available_on_ios" BOOLEAN NOT NULL,
    "available_on_android" BOOLEAN NOT NULL,

    CONSTRAINT "AppVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingMetrics" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" TEXT NOT NULL,
    "total_training_classes" INTEGER NOT NULL,
    "total_watched_classes" INTEGER NOT NULL,
    "total_watched_classes_percentage" INTEGER NOT NULL,

    CONSTRAINT "TrainingMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchedClasses" (
    "user_id" TEXT NOT NULL,
    "videoclass_id" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchedClasses_pkey" PRIMARY KEY ("user_id","videoclass_id")
);

-- CreateTable
CREATE TABLE "_TrainingToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Training_name_key" ON "Training"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VideoClass_name_key" ON "VideoClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TrainingToUser_AB_unique" ON "_TrainingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainingToUser_B_index" ON "_TrainingToUser"("B");

-- AddForeignKey
ALTER TABLE "VideoClass" ADD CONSTRAINT "VideoClass_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingMetrics" ADD CONSTRAINT "TrainingMetrics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingMetrics" ADD CONSTRAINT "TrainingMetrics_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedClasses" ADD CONSTRAINT "WatchedClasses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingToUser" ADD CONSTRAINT "_TrainingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingToUser" ADD CONSTRAINT "_TrainingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
