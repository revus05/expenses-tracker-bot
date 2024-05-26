import prisma from '../../prisma/client/prismaClient'

type CountTotalUserExpenses = (id: number) => Promise<number>

const countTotalUserExpenses: CountTotalUserExpenses = async id => {
  const total = await prisma.expense.aggregate({
    _sum: {
      sum: true,
    },
    where: {
      userId: id,
    },
  })

  return total._sum.sum || 0
}

export default countTotalUserExpenses
