import { InlineKeyboard } from 'grammy'
import fillCategoryKeyboard from '../utils/fillCategoryKeyboard'
import { MyContext, UserState } from '../index'

type HandleTextMessage = (ctx: MyContext, userStates: Record<number, UserState>) => Promise<void>

const handleTextMessage: HandleTextMessage = async (ctx, userStates) => {
  if (!ctx.message || !ctx.message.text || !ctx.from) {
    await ctx.reply('Error no data.')
    return
  }
  const inlineKeyboard = new InlineKeyboard()
  fillCategoryKeyboard(inlineKeyboard)

  const match = ctx.message.text.match(/(\d+)р/g)
  if (match) {
    userStates[ctx.from.id] = { firstNumber: parseFloat(match[0]) }
    await ctx.reply('Выберите категорию: ', {
      reply_markup: inlineKeyboard,
    })
  } else {
    await ctx.reply('Такой команды не найдено')
  }
}

export default handleTextMessage
