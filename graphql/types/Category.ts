import { objectType, extendType, queryType, inputObjectType } from 'nexus'
import { User } from './User'
import { Goal } from './Goal'

export const Category = objectType({
    name: 'Category',
    definition(t) {
        t.string('id')
        t.string('category')
        t.string('value')
        t.string('title')
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

export const createCategoryInput = inputObjectType({
    name: 'createCategoryInput',
    definition(t) {
        t.string('id')
        t.string('category'),
            t.string('title'),
            t.string('value')
    }
});

// export const categoriesQuery = extendType({
//     type: 'Query',
//     definition(t) {
//         t.nonNull.list.field('categories', {
//             type: Category,
//             async resolve(_, __, ctx) {
//                 return await ctx.prisma.category.findMany()
//             },
//         })
//     },
// })

