import { objectType, extendType } from 'nexus'
import { User } from './User'
import { Goal } from './Goal'

export const Comment = objectType({
    name: 'Comment',
    definition(t) {
        t.string('id')
        t.string('content')
        t.field('user', {
            type: User,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.comment
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .user()
            }
        })
        t.field('goal', {
            type: Goal,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.comment
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .goal()
            }
        })
    }
})

export const CommentsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('comments', {
            type: 'Comment',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.comment.findMany()
            },
        })
    },
})