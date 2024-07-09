/*
  Warnings:

  - You are about to alter the column `description` on the `blogs` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);
