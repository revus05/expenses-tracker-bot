import { MyContext } from '../utils/bot'
import handleAddCategoryCallback from './callbacks/handleAddCategoryCallback'
import handleSetPreferredCurrencyCallback from './callbacks/handleSetPreferredCurrencyCallback'

type HandleInlineKeyboardClick = (ctx: MyContext) => Promise<void>

const handleInlineKeyboardClick: HandleInlineKeyboardClick = async ctx => {
  if (ctx.callbackQuery?.data?.includes(`addCategory`)) {
    await handleAddCategoryCallback(ctx)
  } else if (ctx.callbackQuery?.data?.includes(`set_preferred_currency`)) {
    await handleSetPreferredCurrencyCallback(ctx)
  }
}

export default handleInlineKeyboardClick
