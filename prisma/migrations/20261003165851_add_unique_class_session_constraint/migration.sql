/*
  Warnings:

  - A unique constraint covering the columns `[session,class_name]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session,section_name]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_session_class_name_key" ON "Class"("session", "class_name");

-- CreateIndex
CREATE UNIQUE INDEX "Section_session_section_name_key" ON "Section"("session", "section_name");
