/*
  Warnings:

  - You are about to drop the column `user_id` on the `PersonalInfos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `PersonalInfos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `PersonalInfos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PersonalInfos" DROP CONSTRAINT "PersonalInfos_user_id_fkey";

-- DropIndex
DROP INDEX "PersonalInfos.user_id_unique";

-- AlterTable
ALTER TABLE "PersonalInfos" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfos.userId_unique" ON "PersonalInfos"("userId");

-- AddForeignKey
ALTER TABLE "PersonalInfos" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
