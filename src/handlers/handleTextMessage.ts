import getCategoryKeyboard from '../utils/getCategoryKeyboard'
import { MyContext } from '../utils/bot'
import getCategoryText from '../utils/getCategoryText'
import createExpense from '../queries/createExpense'
import getAICategoryPrediction from '../queries/getAICategoryPrediction'
import { Expense } from '@prisma/client'

type HandleTextMessage = (ctx: MyContext) => Promise<void>

const handleTextMessage: HandleTextMessage = async ctx => {
  if (!ctx.message || !ctx.message.text || !ctx.from) {
    await ctx.reply('Error no data.')
    return
  }

  const match = ctx.message.text.match(/\d+([.,]\d+)?/)
  if (!match) {
    await ctx.reply('Такой команды не найдено')
    return
  }

  const expense: Expense = await createExpense(
    Math.round(100 * parseFloat(match[0].replace(',', '.'))) / 100,
    ctx.from.id,
  )

  const AICategoryPrediction = await getAICategoryPrediction(ctx.message.text)

  const inlineKeyboard = getCategoryKeyboard(expense.id)
  await ctx.reply('Добавьте категорию: ', {
    reply_markup: AICategoryPrediction
      ? inlineKeyboard
          .row()
          .text(
            `Рекомендация нейросети: ${getCategoryText(AICategoryPrediction)}`,
            `addCategory_${AICategoryPrediction}_${expense.id}`,
          )
      : inlineKeyboard,
  })
}

export default handleTextMessage
