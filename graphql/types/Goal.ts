import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { User } from './User'
import { Comment } from './Comment'

export const Goal = objectType({
    name: 'Goal',
    definition(t) {
        t.string('id')
        t.string('title')
        t.string('description')
        t.string('category')
        t.field('user', {
            type: User,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.goal
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .user()
            }
        })
        t.list.field('comments', {
            type: Comment,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.goal
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    }).
                    comments()
            }
        })
    }
})

export const GetGoals = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('goals', {
            type: 'Goal',
            async resolve(_parent, _args, ctx) {
                return (await ctx.prisma.goal.findMany())
            },
        })
    },
})

export const GetGoal = extendType({
    type: 'Query',
    definition(t) {
        t.field('goal', {
            type: 'Goal',
            args: {
                id: nonNull(stringArg()),
            },
            async resolve(_parent, { id }, ctx) {
                return await ctx.prisma.goal.findUnique({
                    where: {
                        id,
                    },
                })
            }
        })
    }
})