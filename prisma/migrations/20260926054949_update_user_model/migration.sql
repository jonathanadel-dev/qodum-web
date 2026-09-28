/*
  Warnings:

  - You are about to drop the column `session` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `module_name` on the `UserPermission` table. All the data in the column will be lost.
  - You are about to drop the column `sub_menu` on the `UserPermission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,permission_item_id,session]` on the table `UserPermission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permission_item_id` to the `UserPermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `UserPermission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_session_fkey";

-- DropForeignKey
ALTER TABLE "UserPermission" DROP CONSTRAINT "UserPermission_user_id_fkey";

-- DropIndex
DROP INDEX "UserPermission_user_id_module_name_sub_menu_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "session";

-- AlterTable
ALTER TABLE "UserPermission" DROP COLUMN "module_name",
DROP COLUMN "sub_menu",
ADD COLUMN     "permission_item_id" INTEGER NOT NULL,
ADD COLUMN     "session" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PermissionItem" (
    "id" SERIAL NOT NULL,
    "module_name" TEXT NOT NULL,
    "page_name" TEXT NOT NULL,

    CONSTRAINT "PermissionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PermissionItem_module_name_page_name_key" ON "PermissionItem"("module_name", "page_name");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermission_user_id_permission_item_id_session_key" ON "UserPermission"("user_id", "permission_item_id", "session");

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_permission_item_id_fkey" FOREIGN KEY ("permission_item_id") REFERENCES "PermissionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
