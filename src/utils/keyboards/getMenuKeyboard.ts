import { InlineKeyboard } from 'grammy'

type MenuKeyboard = () => InlineKeyboard

const getMenuKeyboard: MenuKeyboard = () => {
  const keyboard = new InlineKeyboard()
  keyboard.text('Список трат', 'listExpenses').row()
  keyboard.text('Список регулярных трат', 'listPeriodicExpenses').row()
  keyboard.text('Задать валюту пользователя', 'updatePreferredCurrency')
  return keyboard
}

export default getMenuKeyboard
