import getCategoryKeyboard from '../utils/getCategoryKeyboard'
import { MyContext } from '../utils/init/bot'
import getCategoryText from '../utils/getCategoryText'
import createExpense from '../queries/createExpense'
import getAICategoryPrediction from '../queries/getAICategoryPrediction'
import { Expense } from '@prisma/client'
import getMoneyWithSymbol from '../utils/getMoneyWithSymbol'

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
    match[0].length + 1 < ctx.message.text.length ? ctx.message.text : undefined,
  )

  const AICategoryPrediction = await getAICategoryPrediction(ctx.message.text)

  const inlineKeyboard = getCategoryKeyboard(expense.id)
  await ctx.reply(`Добавьте категорию для траты в ${getMoneyWithSymbol(expense.currency, expense.sum)}: `, {
    reply_markup: AICategoryPrediction
      ? inlineKeyboard
          .row()
          .text(
            `Рекомендация нейросети: ${getCategoryText(AICategoryPrediction)}`,
            `addCategory-${AICategoryPrediction}-${expense.id}`,
          )
      : inlineKeyboard,
  })
}

export default handleTextMessage
