/*
  Warnings:

  - Made the column `balance` on table `Accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Accounts_balance_key";

-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "balance" SET NOT NULL;
