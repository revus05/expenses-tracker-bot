import { InlineKeyboard } from 'grammy'

type GetExpenseKeyboard = (
  expenseId: number,
  messageId: number,
  category: string,
  description: string,
) => InlineKeyboard

const getExpenseKeyboard: GetExpenseKeyboard = (expenseId, messageId, category, description) => {
  const keyboard = new InlineKeyboard()
  keyboard.text('💰 Изменить сумму', `updateExpenseSum_${expenseId}_${messageId}`).row()
  keyboard.text('💸 Изменить валюту', `updateExpenseCurrency_${expenseId}`).row()
  keyboard.text(`🏷 ${category ? 'Изменить' : 'Добавить'} категорию`, `updateExpenseCategory_${expenseId}`).row()
  keyboard
    .text(`📝 ${description ? 'Изменить' : 'Добавить'} описание`, `updateExpenseDescription_${expenseId}_${messageId}`)
    .row()
  keyboard.text('❌ Удалить трату', `deleteExpense_${expenseId}|listExpenses`).row()
  keyboard.text('<< Назад к списку', `listExpenses`)

  return keyboard
}

export default getExpenseKeyboard
