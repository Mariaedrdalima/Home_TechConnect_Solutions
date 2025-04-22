/*
  Warnings:

  - Added the required column `value` to the `DownHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DownHistory" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
