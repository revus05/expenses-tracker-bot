import { InlineKeyboard } from 'grammy'
import getCategoryText from './getCategoryText'
import categories from '../data/categories'
import { $Enums } from '@prisma/client'

const getCategoryKeyboard = (messageId: number) => {
  const keyboard = new InlineKeyboard()
  categories.forEach((category: $Enums.ExpenseCategory, i: number) => {
    if (i % 2 == 0) {
      keyboard.row()
    }
    keyboard.text(getCategoryText(category), `addCategory-${category}-${messageId}`)
  })

  return keyboard
}

export default getCategoryKeyboard
