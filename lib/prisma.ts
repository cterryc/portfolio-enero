import { ENV } from '@/config/env'
import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const { DATABASE_URL, NODE_ENV } = ENV

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const adapter = new PrismaPg({
  connectionString: DATABASE_URL
})

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter
  })

if (NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
