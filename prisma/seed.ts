import { PrismaClient } from '@prisma/client';
import { goals, users, comments, CATEGORIES, steps } from './seeds';

const prisma = new PrismaClient();
const seedDB = async () => {
    await Promise.all(
        users.map(async (user) =>
            prisma.user.upsert({
                where: { id: user.id },
                update: {},
                create: user,
            })
        )
    );
    await Promise.all(
        goals.map(async (goal) =>
            prisma.goal.upsert({
                where: { id: goal.id },
                update: {},
                create: goal,
            })
        )
    );
    await Promise.all(
        steps.map(async (step) =>
            prisma.step.upsert({
                where: { id: step.id },
                update: {},
                create: step,
            })
        )
    );
    await Promise.all(
        comments.map(async (comment) =>
            prisma.comment.upsert({
                where: { id: comment.id },
                update: {},
                create: comment,
            })
        )
    );
    await Promise.all(
        CATEGORIES.map(async (category) =>
            prisma.category.upsert({
                where: { id: category.id },
                update: {},
                create: category,
            })
        )
    );
}
seedDB().catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
        await prisma.$disconnect();
    });