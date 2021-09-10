-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionType" VARCHAR(255) NOT NULL DEFAULT E'free',
ALTER COLUMN "role" SET DEFAULT E'';
