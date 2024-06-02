import { Expense } from '@prisma/client'
import getMoneyWithSymbol from '../utils/getMoneyWithSymbol'
import getCategoryText from '../utils/getCategoryText'
import getTotalSum from '../queries/getTotalSum'

type GetAddedNewExpenseText = (expense: Expense) => Promise<string>

const getAddedNewExpenseText: GetAddedNewExpenseText = async (expense: Expense) => {
  return `✅ Успешно!
Добавлено: ${getMoneyWithSymbol(expense.currency, expense.sum)} в кат. ${getCategoryText(expense.category)}

Статистика за последний месяц:
${getCategoryText(expense.category)}: ${await getTotalSum(expense.userId, expense.category)}
💰 Общие расходы: ${await getTotalSum(expense.userId)}`
}

export default getAddedNewExpenseText
