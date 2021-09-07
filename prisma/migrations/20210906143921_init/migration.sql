/*
  Warnings:

  - You are about to drop the `personlInfos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "personlInfos" DROP CONSTRAINT "personlInfos_user_id_fkey";

-- DropTable
DROP TABLE "personlInfos";

-- CreateTable
CREATE TABLE "PersonalInfos" (
    "user_id" INTEGER NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfos.user_id_unique" ON "PersonalInfos"("user_id");

-- AddForeignKey
ALTER TABLE "PersonalInfos" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
