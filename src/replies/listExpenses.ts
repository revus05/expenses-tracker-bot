import { Expense } from '@prisma/client'
import getMoneyWithSymbol from '../utils/getMoneyWithSymbol'
import getDateFormat from '../utils/getDateFormat'
import getCategoryText from '../utils/getCategoryText'
import convertNumberToEmoji from '../utils/convertNumberToEmoji'

type ListExpenses = (expenses: Expense[]) => string

const listExpenses: ListExpenses = expenses => {
  let resultString = '📊 Ваши траты:\n\n'
  expenses.forEach((expense: Expense, i) => {
    resultString += `${convertNumberToEmoji(i + 1)} <b>Трата</b>
💰 <b>Сумма:</b> ${getMoneyWithSymbol(expense.currency, expense.sum)}
🏷 <b>Категория:</b> ${expense.category == null ? 'Без категории' : getCategoryText(expense.category)}
📝 <b>Описание:</b> ${expense.description ? expense.description : `<i>Нет описания</i>`}
📅 <b>Дата:</b> ${getDateFormat(expense.createdAt)}\n\n`
  })

  return resultString
}

export default listExpenses
