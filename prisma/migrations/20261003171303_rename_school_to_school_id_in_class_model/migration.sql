/*
  Warnings:

  - You are about to drop the column `school` on the `Class` table. All the data in the column will be lost.
  - Added the required column `school_id` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_school_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "school",
ADD COLUMN     "school_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
