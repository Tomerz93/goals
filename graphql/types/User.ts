import { objectType, extendType } from 'nexus'
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