/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ZapRun` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ZapRunOutbox` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Zap" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ZapRun" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ZapRunOutbox" DROP COLUMN "updatedAt";
