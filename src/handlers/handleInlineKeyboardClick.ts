import { MyContext } from '../utils/init/bot'
import handleAddCategoryCallback from './callbacks/handleAddCategoryCallback'
import handleSetPreferredCurrencyCallback from './callbacks/handleSetPreferredCurrencyCallback'
import handleListCallback from './callbacks/handleListCallback'

type HandleInlineKeyboardClick = (ctx: MyContext) => Promise<void>

const handleInlineKeyboardClick: HandleInlineKeyboardClick = async ctx => {
  if (ctx.callbackQuery?.data?.includes(`addCategory`)) {
    await handleAddCategoryCallback(ctx)
  } else if (ctx.callbackQuery?.data?.includes(`set_preferred_currency`)) {
    await handleSetPreferredCurrencyCallback(ctx)
  } else if (ctx.callbackQuery?.data?.includes(`list`)) {
    await handleListCallback(ctx)
  }
}

export default handleInlineKeyboardClick
