import { Expense, ExpenseCategory } from '@prisma/client'
import { Category } from '../types/categories'
import prisma from '../../prisma/client/prismaClient'

type CreateExpense = (sum: number, userId: number, category: Category) => Promise<Expense>

const createExpense: CreateExpense = async (sum, userId, category) => {
  const expense: Expense = await prisma.expense.create({
    data: {
      sum,
      userId,
      category,
    },
  })
  return expense
}

export default createExpense
