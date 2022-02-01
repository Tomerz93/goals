// /graphql/context.ts
import { PrismaClient } from '@prisma/client'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import prisma from '../src/lib/prisma'

export type Context = {
    prisma: PrismaClient
    session: Session | null
}
export async function createContext({ req, res }): Promise<Context> {
    const session = await getSession({ req });
    return {
        prisma,
        session,
    }
}