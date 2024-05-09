import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

// camada para intacia do banco
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
