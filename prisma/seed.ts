import { PrismaClient } from '@prisma/client';
import { goals, users, comments } from './seeds';

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
        comments.map(async (comment) =>
            prisma.comment.upsert({
                where: { id: comment.id },
                update: {},
                create: comment,
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