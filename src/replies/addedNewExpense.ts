import { Expense } from '@prisma/client'
import getMoneyValue from '../utils/getMoneyValue'
import getCategoryValue from '../utils/getCategoryValue'
import getTotalSumForCategory from '../queries/getTotalSumForCategory'

type GetAddedNewExpenseText = (expense: Expense, totalSum: number) => Promise<string>

const getAddedNewExpenseText: GetAddedNewExpenseText = async (expense, totalSum) => {
  return `✅ Успешно!
Добавлено: ${getMoneyValue(expense.currency, expense.sum)} в кат. ${getCategoryValue(expense.category)}

Статистика за последний месяц:
${getCategoryValue(expense.category)}: ${getMoneyValue(expense.currency, (await getTotalSumForCategory(expense.category, expense.userId)) || 0)}
💰 Общие расходы: ${getMoneyValue(expense.currency, totalSum)}`
}

export default getAddedNewExpenseText
