import convertNumberToEmoji from '../../utils/convertNumberToEmoji'
import getMoneyWithSymbol from '../../utils/getMoneyWithSymbol'
import getCategoryText from '../../utils/getCategoryText'
import { PeriodicExpense } from '@prisma/client'

type ListPeriodicExpenses = (periodicExpenses: PeriodicExpense[]) => Promise<string>

const listPeriodicExpenses: ListPeriodicExpenses = async periodicExpenses => {
  let resultString = `Регулярные траты:\n`
  periodicExpenses.forEach((periodicExpense, i) => {
    resultString +=
      `${convertNumberToEmoji(i + 1)} ${periodicExpense.name}\n` +
      `💰 <b>Сумма:</b> ${getMoneyWithSymbol(periodicExpense.currency, periodicExpense.sum)}\n` +
      `🏷 <b>Категория:</b> ${periodicExpense.category ? getCategoryText(periodicExpense.category) : `<i>Нет категории</i>`}\n` +
      `🏷 <b>Последний месяц: ❌ Не оплачено</b> \n` +
      `📝 <b>Описание:</b> ${periodicExpense.description ? periodicExpense.description : `<i>Нет описания</i>`}\n` +
      `📅 <b>Период:</b> ${periodicExpense.periodDays} дней\n\n`
  })

  return resultString
}

export default listPeriodicExpenses
