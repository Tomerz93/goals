import { objectType, extendType } from 'nexus'
import { User } from './User'
import { Goal } from './Goal'

export const Category = objectType({
    name: 'Category',
    definition(t) {
        t.string('id')
        t.string('title')
        t.string('goalId')
        t.string('value')
        t.field('user', {
            type: User,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.category
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .users()
            }
        })
        t.field('goal', {
            type: Goal,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.category
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .goals()
            }
        })
    }
})

export const CommentsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('categories', {
            type: 'Category',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.category.findMany()
            },
        })
    },
})
