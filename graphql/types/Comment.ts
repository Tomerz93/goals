import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { User } from './User'
import { Goal } from './Goal'

export const Comment = objectType({
    name: 'Comment',
    definition(t) {
        t.string('id')
        t.string('content')
        t.string('goalId')
        t.string('userId')
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


export const addComment = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('addComment', {
            type: 'Comment',
            args: {
                content: nonNull(stringArg()),
                userId: nonNull(stringArg()),
                goalId: nonNull(stringArg())
            },
            async resolve(_root, args, ctx) {
                const userId = ctx?.session?.userId
                return await ctx.prisma.comment.create({
                    data: {
                        content: args.content,
                        goalId: args.goalId,
                        userId: userId ?? ''
                    }
                })
            },
        })
    },
})

export const removeComment = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('removeComment', {
            type: 'Comment',
            args: {
                id: nonNull(stringArg())
            },
            async resolve(_root, args, ctx) {
                return await ctx.prisma.comment.delete({
                    where: {
                        id: args.id
                    }
                })
            },
        })
    }
})

export const updateComment = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('updateComment', {
            type: 'Comment',
            args: {
                id: nonNull(stringArg()),
                content: nonNull(stringArg())
            },
            async resolve(_root, args, ctx) {
                return await ctx.prisma.comment.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        content: args.content
                    }
                })
            },
        })
    }
})