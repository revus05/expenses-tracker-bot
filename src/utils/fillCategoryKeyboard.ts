import { Category } from '../types/categories'
import { InlineKeyboard } from 'grammy'
import getCategoryValue from './getCategoryValue'
import categories from '../data/categories'

const fillCategoryKeyboard = (keyboard: InlineKeyboard) => {
  categories.forEach((category: Category, i: number) => {
    if (i % 2 == 0) {
      keyboard.row()
      keyboard.text(getCategoryValue(category), category)
    } else {
      keyboard.text(getCategoryValue(category), category)
    }
  })
}

export default fillCategoryKeyboard
