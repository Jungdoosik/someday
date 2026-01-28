/*
  Warnings:

  - You are about to drop the column `knockDate` on the `thought` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `thought` DROP COLUMN `knockDate`,
    ADD COLUMN `knockDt` VARCHAR(191) NULL;
