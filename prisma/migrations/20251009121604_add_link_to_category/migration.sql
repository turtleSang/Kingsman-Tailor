/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Category` ADD COLUMN `link` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Category_link_key` ON `Category`(`link`);
