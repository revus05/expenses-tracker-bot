import { MyContext } from '../../utils/init/bot'
import { Expense } from '@prisma/client'
import prisma from '../../../prisma/client/prismaClient'
import { step } from '../../utils/init/config'
import listExpenses from '../../replies/listExpenses'
import getTotalSum from '../../queries/getTotalSum'
import { InlineKeyboard } from 'grammy'
import getCommand from '../../utils/getCommand'

type ListCallback = (ctx: MyContext) => Promise<void>

const handleListCallback: ListCallback = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data || !ctx.from) {
    await ctx.reply('Error no data')
    return
  }

  await ctx.answerCallbackQuery()
  const command = getCommand(ctx.callbackQuery.data, 'list')
  if (!command) {
    await ctx.reply('Error no data')
    return
  }

  let skip = ctx.session.skip

  if (ctx.callbackQuery.data.includes('Prev')) {
    if (skip - step >= 0) {
      skip = skip - step
    }
  } else {
    skip = skip + step
  }
  ctx.session.skip = skip

  const totalExpenses = await prisma.expense.count({
    where: {
      userId: ctx.from.id,
    },
  })

  if (!totalExpenses) {
    await ctx.callbackQuery.message?.editText('Нет трат')
    return
  }

  let expenses: Expense[]

  expenses = await prisma.expense.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      userId: ctx.from.id,
    },
    take: step,
    skip: skip,
  })

  let paginationKeyboard: InlineKeyboard | undefined
  if (totalExpenses > step) {
    paginationKeyboard = new InlineKeyboard()
    if (skip - step >= 0) {
      paginationKeyboard.text(`<< Предыдущие ${step}`, `listPrev`)
    }
    if (skip + step < totalExpenses) {
      paginationKeyboard.text(
        totalExpenses - skip - step > step ? `Следущие ${step} >>` : `Последние ${totalExpenses - skip - step} >>`,
        `listNext`,
      )
    }
  }

  let reply = listExpenses(expenses, await getTotalSum(ctx.from.id), skip)
  await ctx.callbackQuery.message?.editText(reply.expenses, {
    parse_mode: 'HTML',
    reply_markup: paginationKeyboard
      ? new InlineKeyboard([...reply.keyboard.inline_keyboard, ...paginationKeyboard.inline_keyboard])
      : reply.keyboard,
  })
}

export default handleListCallback
