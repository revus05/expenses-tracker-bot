import { MyContext } from '../../utils/init/bot'
import getCommand from '../../utils/getCommand'
import findAllOccurrences from '../../utils/findAllOccurrences'

type UpdateExpenseDescription = (ctx: MyContext) => Promise<void>

const updateExpenseDescription: UpdateExpenseDescription = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
    await ctx.reply('Error no data')
    return
  }

  const command = getCommand(ctx.callbackQuery.data, 'updateExpenseDescription')

  if (!command) {
    await ctx.reply('Error no data')
    return
  }

  const indexes = findAllOccurrences(command, '_')
  ctx.session.messageId = +command.substring(indexes[1] + 1)
  ctx.session.expenseId = +command.substring(indexes[0] + 1, indexes[1])

  await ctx.answerCallbackQuery()
  await ctx.conversation.enter('updateExpenseDescriptionConversation')
}

export default updateExpenseDescription
