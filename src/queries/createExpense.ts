import { Currency, Expense } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'

type CreateExpense = (sum: number, userId: number, description: string | undefined) => Promise<Expense>

const createExpense: CreateExpense = async (sum, userId, description) => {
  const userObj: { preferredCurrency: Currency } | null = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      preferredCurrency: true,
    },
  })
  const expense: Expense = await prisma.expense.create({
    data: {
      sum,
      userId,
      currency: userObj?.preferredCurrency,
      description: description,
    },
  })
  return expense
}

export default createExpense
