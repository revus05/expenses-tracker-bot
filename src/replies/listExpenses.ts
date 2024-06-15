import { Expense } from '@prisma/client'
import getMoneyWithSymbol from '../utils/getMoneyWithSymbol'
import getDateFormat from '../utils/getDateDayFormat'
import getCategoryText from '../utils/getCategoryText'
import convertNumberToEmoji from '../utils/convertNumberToEmoji'
import { InlineKeyboard } from 'grammy'

type ListExpenses = (expenses: Expense[], totalSum: string, skip: number) => List

type List = {
  expenses: string
  keyboard: InlineKeyboard
}

const listExpenses: ListExpenses = (expenses, totalSum, skip) => {
  let resultString = '📊 Ваши траты:\n\n'
  const keyboard = new InlineKeyboard()
  expenses.forEach((expense: Expense, i) => {
    resultString += `${convertNumberToEmoji(i + 1)} <b>Трата</b>
💰 <b>Сумма:</b> ${getMoneyWithSymbol(expense.currency, expense.sum)}
🏷 <b>Категория:</b> ${expense.category ? getCategoryText(expense.category) : `<i>Нет категории</i>`}
📝 <b>Описание:</b> ${expense.description ? expense.description : `<i>Нет описания</i>`}
📅 <b>Дата:</b> ${getDateFormat(expense.createdAt)}\n\n`

    keyboard.text(`${i + 1}`, `expense_${expense.id}`)
  })

  resultString += `<b>Итоговая сумма за месяц:</b> ${totalSum}`
  keyboard.row()

  return {
    expenses: resultString,
    keyboard,
  }
}

export default listExpenses
