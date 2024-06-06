import { CommandContext, InlineKeyboard } from 'grammy'
import { MyContext } from '../utils/init/bot'
import { Expense } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'
import listExpenses from '../replies/listExpenses'
import getTotalSum from '../queries/getTotalSum'
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
      totalExpenses - step > step ? `Следущие ${step} >>` : `Последние ${totalExpenses - step} >>`,
      `listNext_${step}`,
    )
  }

  let reply = listExpenses(expenses, await getTotalSum(ctx.from.id))
  await ctx.reply(reply, {
    parse_mode: 'HTML',
    reply_markup: paginationKeyboard,
  })
}

export default handleListCommand
