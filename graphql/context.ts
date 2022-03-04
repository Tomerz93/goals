// /graphql/context.ts
import { PrismaClient } from '@prisma/client'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import prisma from '../lib/prisma'

interface SessionWithUserId extends Session {
    userId?: string
}

export type Context = {
    prisma: PrismaClient
    session: SessionWithUserId | null
}
export async function createContext({ req, res }): Promise<Context> {
    const session = await getSession({ req });
    return {
        prisma,
        session,
    }
}