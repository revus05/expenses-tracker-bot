import { Expense } from '@prisma/client'
import getMoneyWithSymbol from '../utils/getMoneyWithSymbol'
import getCategoryText from '../utils/getCategoryText'
import getDateDayFormat from '../utils/getDateDayFormat'
import getDateTimeFormat from '../utils/getDateTimeFormat'

type ExpenseInfo = (expense: Expense) => string

const expenseInfo: ExpenseInfo = expense => {
  return (
    `Трата <b>№${expense.id}</b>\n\n` +
    `💰 <b>Сумма:</b> ${getMoneyWithSymbol(expense.currency, expense.sum)}\n` +
    `🏷 <b>Категория:</b> ${expense.category == null ? 'Без категории' : getCategoryText(expense.category)}\n` +
    `📝 <b>Описание:</b> ${expense.description ? expense.description : `<i>Нет описания</i>`}\n` +
    `📅 <b>Дата создания:</b> ${getDateDayFormat(expense.createdAt)} ${getDateTimeFormat(expense.createdAt)}\n` +
    `📅 <b>Дата изменения:</b> ${getDateDayFormat(expense.updatedAt)} ${getDateTimeFormat(expense.updatedAt)}\n\n`
  )
}

export default expenseInfo
