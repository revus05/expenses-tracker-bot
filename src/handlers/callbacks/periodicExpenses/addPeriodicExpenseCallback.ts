import { MyContext } from '../../../utils/init/bot'

type AddPeriodicExpenseCallback = (ctx: MyContext) => Promise<void>

const addPeriodicExpenseCallback: AddPeriodicExpenseCallback = async ctx => {
  await ctx.answerCallbackQuery()
  await ctx.conversation.enter('addPeriodicExpenseConversation')
}

export default addPeriodicExpenseCallback
