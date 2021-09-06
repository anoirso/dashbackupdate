/*
  Warnings:

  - You are about to drop the column `user_id` on the `AccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccessToken" DROP CONSTRAINT "AccessToken_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_user_id_fkey";

-- AlterTable
ALTER TABLE "AccessToken" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "user_id";
