/*
  Warnings:

  - You are about to drop the column `category` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `val` on the `skills` table. All the data in the column will be lost.
  - Added the required column `key` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skills" DROP COLUMN "category",
DROP COLUMN "color",
DROP COLUMN "label",
DROP COLUMN "status",
DROP COLUMN "val",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "value" TEXT[];
