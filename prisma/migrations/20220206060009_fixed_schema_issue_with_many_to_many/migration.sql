/*
  Warnings:

  - You are about to drop the `CategoriesOnGoals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoriesOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnGoals" DROP CONSTRAINT "CategoriesOnGoals_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnGoals" DROP CONSTRAINT "CategoriesOnGoals_goalId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnUsers" DROP CONSTRAINT "CategoriesOnUsers_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnUsers" DROP CONSTRAINT "CategoriesOnUsers_userId_fkey";

-- DropTable
DROP TABLE "CategoriesOnGoals";

-- DropTable
DROP TABLE "CategoriesOnUsers";

-- CreateTable
CREATE TABLE "_CategoryToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToGoal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToUser_AB_unique" ON "_CategoryToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToUser_B_index" ON "_CategoryToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToGoal_AB_unique" ON "_CategoryToGoal"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToGoal_B_index" ON "_CategoryToGoal"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToUser" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGoal" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGoal" ADD FOREIGN KEY ("B") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
