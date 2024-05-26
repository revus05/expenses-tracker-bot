import { InlineKeyboard } from 'grammy'
import fillCategoryKeyboard from '../utils/fillCategoryKeyboard'
import { UserState } from '../index'
import { MyContext } from '../utils/bot'

type HandleTextMessage = (ctx: MyContext, userStates: Record<number, UserState>) => Promise<void>

const handleTextMessage: HandleTextMessage = async (ctx, userStates) => {
  if (!ctx.message || !ctx.message.text || !ctx.from) {
    await ctx.reply('Error no data.')
    return
  }
  const inlineKeyboard = new InlineKeyboard()
  fillCategoryKeyboard(inlineKeyboard)

  const match = ctx.message.text.match(/(\d+)р/g)
  if (!match) {
    await ctx.reply('Такой команды не найдено')
    return
  }

  userStates[ctx.from.id] = { firstNumber: parseFloat(match[0]) }
  await ctx.reply('Выберите категорию: ', {
    reply_markup: inlineKeyboard,
  })
}

export default handleTextMessage
