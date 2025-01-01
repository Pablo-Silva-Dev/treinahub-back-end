/*
  Warnings:

  - Added the required column `cep` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_sector` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_employees` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residence_complement` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residence_number` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "company_sector" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "number_of_employees" TEXT NOT NULL,
ADD COLUMN     "residence_complement" TEXT NOT NULL,
ADD COLUMN     "residence_number" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;
