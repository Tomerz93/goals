-- CreateTable
CREATE TABLE "CategoriesOnGoals" (
    "goalId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnGoals_pkey" PRIMARY KEY ("goalId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnGoals" ADD CONSTRAINT "CategoriesOnGoals_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnGoals" ADD CONSTRAINT "CategoriesOnGoals_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
