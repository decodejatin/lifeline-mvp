import { PrismaClient } from '@prisma/client'

// Avoid creating multiple instances of PrismaClient in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV === 'development') global.prisma = prisma

// TODO: Set DATABASE_URL in .env for local development (use Supabase/Neon free tier)
