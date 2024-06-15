import { MyContext } from '../utils/init/bot'
import { Conversation } from '@grammyjs/conversations'
import prisma from '../../prisma/client/prismaClient'
import expenseSumChanged from '../replies/expenseSumChanged'
import { Expense } from '@prisma/client'
import expenseInfo from '../replies/expenseInfo'
import getExpenseKeyboard from '../utils/keyboards/getExpenseKeyboard'
import getMoneyWithSymbol from '../utils/getMoneyWithSymbol'

type UpdateExpenseSumConversation = (conversation: Conversation<MyContext>, ctx: MyContext) => Promise<void>

const updateExpenseSumConversation: UpdateExpenseSumConversation = async (conversation, ctx) => {
  await ctx.reply('Введите новую сумму: ')
  let newSumMessage = await conversation.waitFor('message:text')
  let result = validateNewSumMessage(newSumMessage.msg.text)
  while (!result.isValid) {
    await ctx.reply(result.message)
    newSumMessage = await conversation.waitFor('message:text')
    result = validateNewSumMessage(newSumMessage.msg.text)
  }

  const expenseId = ctx.session.expenseId

  const updatedExpense: Expense = await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      sum: +newSumMessage.msg.text,
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
    await ctx.reply(
      `Сумма траты уже равна <b>${getMoneyWithSymbol(updatedExpense.currency, updatedExpense.sum)}!</b>`,
      {
        parse_mode: 'HTML',
      },
    )

    return
  }

  await ctx.reply(expenseSumChanged(updatedExpense), {
    parse_mode: 'HTML',
  })
}

type response = {
  isValid: boolean
  message: string
}
type ValidateNewSumMessage = (message: string) => response

const validateNewSumMessage: ValidateNewSumMessage = (message: string) => {
  const newSum = +message
  if (!newSum && newSum != 0) {
    return {
      isValid: false,
      message: 'Введите сообщене с цифрой:',
    }
  }
  if (newSum <= 0) {
    return {
      isValid: false,
      message: 'Введите число больше 0:',
    }
  }
  return {
    isValid: true,
    message: 'valid',
  }
}

export default updateExpenseSumConversation
