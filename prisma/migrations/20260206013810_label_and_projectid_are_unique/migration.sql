/*
  Warnings:

  - A unique constraint covering the columns `[project_id,label]` on the table `project_stats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "project_stats_project_id_label_key" ON "project_stats"("project_id", "label");
