-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "number_of_additional_employees" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "used_storage" INTEGER NOT NULL DEFAULT 0;
