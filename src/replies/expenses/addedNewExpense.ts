import { Expense } from '@prisma/client'
import getMoneyWithSymbol from '../../utils/getMoneyWithSymbol'
import getCategoryText from '../../utils/getCategoryText'
import getTotalSum from '../../queries/getTotalSum'

type GetAddedNewExpenseText = (expense: Expense) => Promise<string>

const getAddedNewExpenseText: GetAddedNewExpenseText = async (expense: Expense) => {
  return (
    `✅ Успешно!\n` +
    `Добавлено: ${getMoneyWithSymbol(expense.currency, expense.sum)} в кат. ${getCategoryText(expense.category)}\n\n` +
    `Статистика за последний месяц:\n` +
    `${getCategoryText(expense.category)}: ${await getTotalSum(expense.userId, expense.category)}\n` +
    `💰 Общие расходы: ${await getTotalSum(expense.userId)}\n\n` +
    `/list - Вывести список всех трат`
  )
}

export default getAddedNewExpenseText
