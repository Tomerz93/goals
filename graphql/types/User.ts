import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { Goal } from './Goal'

export const User = objectType({
    name: 'User',
    definition(t) {
        t.string('id')
        t.string('name')
        t.string('username')
        t.string('email')
        t.string('image')
        t.list.field('goals', {
            type: Goal,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.user
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .goals()
            },
        })
    },
})

export const UsersQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('users', {
            type: 'User',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.user.findMany()
            },
        })
    },
})
export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('user', {
            type: User,
            args: {
                username: nonNull(stringArg()),
            },
            resolve(_parent, _args, ctx) {
                return ctx.prisma.user.findUnique({
                    where: {
                        username: _args.username,
                    },
                })
            },
        })
    },
})

export const AddUserName = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createUsername', {
            type: User,
            args: {
                username: nonNull(stringArg())
            },
            async resolve(_root, args, ctx) {
                return await ctx.prisma.user.update({ where: { id: ctx.session?.userId }, data: { username: args.username } })

            },
        })
    },
})