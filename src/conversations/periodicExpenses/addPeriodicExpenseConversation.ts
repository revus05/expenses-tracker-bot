import { Conversation } from '@grammyjs/conversations'
import { MyContext } from '../../utils/init/bot'
import prisma from '../../../prisma/client/prismaClient'
import handlePeriodicExpensesCommand from '../../handlers/handlePeriodicExpensesCommand'

type AddPeriodicExpenseConversation = (conversation: Conversation<MyContext>, ctx: MyContext) => Promise<void>

const addPeriodicExpenseConversation: AddPeriodicExpenseConversation = async (conversation, ctx) => {
  await ctx.reply('Введите название траты:')
  const newPeriodicExpenseName = await conversation.waitFor('message:text')
  await ctx.reply('Введите сумму траты:')
  const newPeriodicExpenseSum = await conversation.waitFor('message:text')
  await ctx.reply('Как часто надо платить? (Введите период в днях):')
  const newPeriodicExpensePeriod = await conversation.waitFor('message:text')

  const periodicExpense = await prisma.periodicExpense.create({
    data: {
      name: newPeriodicExpenseName.msg.text,
      sum: +newPeriodicExpenseSum.msg.text,
      periodDays: +newPeriodicExpensePeriod.msg.text,
      user: {
        connect: {
          id: ctx.from?.id,
        },
      },
    },
  })

  if (!periodicExpense) {
    return
  }

  await ctx.reply('Регулярная трата успешно создана!')

  await handlePeriodicExpensesCommand(ctx)
}

export default addPeriodicExpenseConversation
