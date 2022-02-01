export const resolvers = {
    Query: {
        goals: (_parent, _args, ctx) => {
            return ctx.prisma.goals.findMany()
        },
    },
}