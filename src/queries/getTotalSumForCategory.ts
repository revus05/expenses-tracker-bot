import { Category } from '../types/categories'
import prisma from '../../prisma/client/prismaClient'

const getTotalSumForCategory = async (category: Category, userId: number) => {
  const sum = await prisma.expense.aggregate({
    _sum: {
      sum: true,
    },
    where: {
      userId,
      category,
    },
  })
  return sum._sum.sum
}

export default getTotalSumForCategory
