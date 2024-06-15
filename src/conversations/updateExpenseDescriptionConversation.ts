import { Conversation } from '@grammyjs/conversations'
import { MyContext } from '../utils/init/bot'
import { Expense } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'
import expenseInfo from '../replies/expenseInfo'
import getExpenseKeyboard from '../utils/keyboards/getExpenseKeyboard'

type UpdateExpenseDescriptionConversation = (conversation: Conversation<MyContext>, ctx: MyContext) => Promise<void>

const updateExpenseDescriptionConversation: UpdateExpenseDescriptionConversation = async (conversation, ctx) => {
  await ctx.reply('Введите новое описание: ')
  const newDescriptionMessage = await conversation.waitFor('message:text')

  const expenseId = ctx.session.expenseId

  const updatedExpense: Expense = await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      description: newDescriptionMessage.message.text,
    },
  })

  try {
    await ctx.api.editMessageText(ctx.chat?.id || 0, ctx.session.messageId, expenseInfo(updatedExpense), {
      parse_mode: 'HTML',
      reply_markup: getExpenseKeyboard(
        updatedExpense.id,
        ctx.session.messageId,
        updatedExpense.category || '',
        updatedExpense.description || '',
      ),
    })
  } catch (e) {
    await ctx.reply(`Описание траты уже <b>${updatedExpense.description}</b>`, {
      parse_mode: 'HTML',
    })

    return
  }

  await ctx.reply(
    `✅ Успешно!
Транзакция <b>№${updatedExpense.id}</b> обновлена
<b>Новое описание:</b> ${updatedExpense.description}`,
    {
      parse_mode: 'HTML',
    },
  )
}

export default updateExpenseDescriptionConversation
