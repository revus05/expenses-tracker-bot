import getMoneyWithSymbol from '../../utils/getMoneyWithSymbol'
import { Expense } from '@prisma/client'

type ExpenseSumChanged = (expense: Expense) => string

const expenseSumChanged: ExpenseSumChanged = expense => {
  return (
    `✅ Успешно!\n` +
    `Транзакция <b>№${expense.id}</b> обновлена\n` +
    `<b>Новая сумма:</b> ${getMoneyWithSymbol(expense.currency, expense.sum)}`
  )
}

export default expenseSumChanged
