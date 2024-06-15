import { InlineKeyboard } from 'grammy'
import getCategoryText from '../getCategoryText'
import categories from '../../data/categories'
import { $Enums } from '@prisma/client'

const getCategoryKeyboard = (command: string) => {
  const keyboard = new InlineKeyboard()
  categories.forEach((category: $Enums.ExpenseCategory, i: number) => {
    if (i % 2 == 0) {
      keyboard.row()
    }
    keyboard.text(getCategoryText(category), `${command}_${category}`)
  })

  return keyboard
}

export default getCategoryKeyboard
