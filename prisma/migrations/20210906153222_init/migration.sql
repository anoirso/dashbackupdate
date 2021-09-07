/*
  Warnings:

  - The primary key for the `PersonalInfos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PersonalInfos" DROP CONSTRAINT "PersonalInfos_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
