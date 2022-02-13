import { objectType, inputObjectType } from 'nexus'
import { Goal } from './Goal'

export const Step = objectType({
    name: 'Step',
    definition(t) {
        t.string('id')
        t.string('title')
        t.string('goalId')
        t.string('description')
        t.boolean('isCompleted'),
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

export const createStepInput = inputObjectType({
    name: 'createStepInput',
    definition(t) {
        t.string('title'),
            t.string('description'),
            t.boolean('isCompleted')
    }
});