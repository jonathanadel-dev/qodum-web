/*
  Warnings:

  - You are about to drop the column `wing_name` on the `Class` table. All the data in the column will be lost.
  - Added the required column `wing_id` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_wing_name_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "wing_name",
ADD COLUMN     "wing_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_wing_id_fkey" FOREIGN KEY ("wing_id") REFERENCES "Wing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
