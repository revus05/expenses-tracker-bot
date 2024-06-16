import convertNumberToEmoji from '../../utils/convertNumberToEmoji'
import getMoneyWithSymbol from '../../utils/getMoneyWithSymbol'
import getCategoryText from '../../utils/getCategoryText'
import { PeriodicExpense } from '@prisma/client'
import { InlineKeyboard } from 'grammy'

type PeriodicExpenseList = {
  periodicExpenses: string
  keyboard: InlineKeyboard
}
type ListPeriodicExpenses = (periodicExpenses: PeriodicExpense[]) => PeriodicExpenseList

const listPeriodicExpenses: ListPeriodicExpenses = periodicExpenses => {
  let resultString = `Регулярные траты:\n`
  const keyboard = new InlineKeyboard()
  periodicExpenses.forEach((periodicExpense, i) => {
    resultString +=
      `${convertNumberToEmoji(i + 1)} ${periodicExpense.name}\n` +
      `💰 <b>Сумма:</b> ${getMoneyWithSymbol(periodicExpense.currency, periodicExpense.sum)}\n` +
      `🏷 <b>Категория:</b> ${periodicExpense.category ? getCategoryText(periodicExpense.category) : `<i>Нет категории</i>`}\n` +
      `🏷 <b>Последний месяц: ❌ Не оплачено</b> \n` +
      `📝 <b>Описание:</b> ${periodicExpense.description ? periodicExpense.description : `<i>Нет описания</i>`}\n` +
      `📅 <b>Период:</b> ${periodicExpense.periodDays} дней\n\n`

    keyboard.text(`${i + 1}`, `periodicExpense_${periodicExpense.id}`)
  })

  return {
    periodicExpenses: resultString,
    keyboard,
  }
}

export default listPeriodicExpenses
