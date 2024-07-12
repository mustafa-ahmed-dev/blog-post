/*
  Warnings:

  - You are about to drop the column `type` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "type";

-- DropEnum
DROP TYPE "blog_type";
