import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

type Data = {
    message: String
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { username = '' } = req.body
    const { userId } = await getSession({ req })
    try {
        const user = await prisma.user.findFirst({ where: { username: username } })
        if (user) {
            return res.status(400).json({ message: 'username already exists' })
        }
        await prisma.user.update({ where: { id: userId }, data: { username } })
        return res.status(200).json({ message: 'success' })
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message })
    }
}
