import { CommandContext, InlineKeyboard } from 'grammy'
import { MyContext } from '../utils/init/bot'
import { Expense } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'
import getCategoryText from '../utils/getCategoryText'
import getMoneyWithSymbol from '../utils/getMoneyWithSymbol'
import getDateFormat from '../utils/getDateFormat'
import listExpenses from '../replies/listExpenses'
import getTotalSum from '../queries/getTotalSum'
import * as repl from 'repl'
import { step } from '../utils/init/config'

type HandleListCommand = (ctx: CommandContext<MyContext>) => Promise<void>

const handleListCommand: HandleListCommand = async ctx => {
  if (!ctx.from) {
    return
  }

  const totalExpenses = await prisma.expense.count({
    where: {
      userId: ctx.from.id,
    },
  })

  const expenses: Expense[] = await prisma.expense.findMany({
    where: {
      userId: ctx.from.id,
    },
    take: step,
  })

  if (!expenses.length) {
    await ctx.reply('Нет трат')
    return
  }
  let paginationKeyboard: InlineKeyboard | undefined
  if (totalExpenses > step) {
    paginationKeyboard = new InlineKeyboard()
    paginationKeyboard.text(
      totalExpenses - step > step ? `Следущие ${step} >>` : `Последние ${totalExpenses - step}`,
      `listNext_${step}`,
    )
  }

  let reply = listExpenses(expenses)
  const message = await ctx.reply(reply, {
    parse_mode: 'HTML',
    reply_markup: paginationKeyboard,
  })

  const totalSum = await getTotalSum(ctx.from.id)
  reply += `<b>Итоговая сумма за месяц:</b> ${totalSum}`

  await ctx.api.editMessageText(message.chat.id, message.message_id, reply, {
    parse_mode: 'HTML',
    reply_markup: paginationKeyboard,
  })
}

export default handleListCommand
