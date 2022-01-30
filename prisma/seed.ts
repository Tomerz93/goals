import { PrismaClient } from '@prisma/client';
import { goals } from './seeds/goals';
import { users } from './seeds/users';

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
    // Goals
    await Promise.all(
        goals.map(async (goal) =>
            prisma.goal.upsert({
                where: { id: goal.id },
                update: {},
                create: goal,
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