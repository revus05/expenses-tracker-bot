import { User } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'

const checkIsUserRegistered = async (id: number | undefined) => {
  if (!id) {
    return false
  }
  const user: User | null = await prisma.user.findFirst({
    where: {
      id,
    },
  })

  return !!user
}

export default checkIsUserRegistered
