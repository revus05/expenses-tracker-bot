import prisma from '../../prisma/client/prismaClient'
import { $Enums, Currency, Expense } from '@prisma/client'
import getMoneyWithSymbol from '../utils/getMoneyWithSymbol'

type GetTotalSumForCategory = (userId: number, category?: $Enums.ExpenseCategory | null) => Promise<string>

const getTotalSum: GetTotalSumForCategory = async (userId, category) => {
  const expenses: Expense[] = await prisma.expense.findMany({
    where: {
      category: category,
      userId,
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  })

  const currencies = new Map<Currency, number>()
  expenses.forEach((expense: Expense) => {
    currencies.set(expense.currency, (currencies.get(expense.currency) || 0) + expense.sum)
  })

  let resultString = ''
  currencies.forEach((sum, currency) => {
    resultString += `${!resultString ? '' : ' + '}${getMoneyWithSymbol(currency, sum)}`
  })

  return resultString
}

export default getTotalSum
