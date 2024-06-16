import { InlineKeyboard } from 'grammy'

type GetPeriodicExpensesKeyboard = () => InlineKeyboard

const getPeriodicExpensesKeyboard: GetPeriodicExpensesKeyboard = () => {
  const keyboard = new InlineKeyboard()
  keyboard.text('➕ Добавить регулярную трату', 'addPeriodicExpense').row()
  keyboard.text('<< В Меню', 'mainMenu').row()
  return keyboard
}

export default getPeriodicExpensesKeyboard
