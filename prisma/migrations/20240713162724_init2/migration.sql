/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `interaction_types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[interaction]` on the table `interaction_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "interaction_types_name_key" ON "interaction_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "interaction_types_interaction_key" ON "interaction_types"("interaction");
