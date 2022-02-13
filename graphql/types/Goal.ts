import { objectType, extendType, nonNull, stringArg, list, extendInputType, arg, inputObjectType } from 'nexus'
import { User } from './User'
import { Comment } from './Comment'
import { Category, createCategoryInput } from './Category'
import { Step, createStepInput } from './Step'

export const Goal = objectType({
    name: 'Goal',
    definition(t) {
        t.string('id')
        t.string('title')
        t.boolean('isCompleted')
        t.string('estimatedCompletionDate')
        t.string('description')
        t.list.field('steps', {
            type: Step,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.goal
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .steps()
            }
        })
        t.list.field('categories', {
            type: Category,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.goal
                    .findUnique({
                        where: {
                            id: _parent.id,
                        },
                    })
                    .categories()
            }
        })
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
        t.nonNull.list.field('allGoals', {
            type: 'Goal',
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.goal.findMany()
            },
        })
        t.nonNull.list.field('goals', {
            type: 'Goal',
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.goal.findMany({
                    where: {
                        user: {
                            id: ctx?.session?.userId
                        }

                    }
                })
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


export const createGoal = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createGoal', {
            type: 'Goal',
            args: {
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                estimatedCompletionDate: nonNull(stringArg()),
                steps: nonNull(list(arg({ type: createStepInput }))),
                categories: nonNull(list(arg({ type: createCategoryInput })))
            },
            async resolve(_parent, args, ctx) {
                return await ctx.prisma.goal.create({
                    data: {
                        title: args.title,
                        estimatedCompletionDate: args.estimatedCompletionDate,
                        description: args.description,
                        user: {
                            connect: {
                                id: ctx?.session?.userId
                            }
                        },
                        steps: {
                            create: args.steps.map(step => ({
                                title: step?.title,
                                description: step?.description,
                            }))
                        },
                        categories: {
                            connect: {
                                id: args?.categories?.map(category => category?.id)
                            }
                        }

                    },
                })
            },
        })
    }
})