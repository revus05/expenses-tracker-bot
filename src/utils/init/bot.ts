import { hydrate, HydrateFlavor } from '@grammyjs/hydrate'
import { Bot, Context, session, SessionFlavor } from 'grammy'
import { config } from 'dotenv'
import { ConversationFlavor, conversations, createConversation } from '@grammyjs/conversations'
import updateExpenseSumConversation from '../../conversations/expenses/updateExpenseSumConversation'
import updateExpenseDescriptionConversation from '../../conversations/expenses/updateExpenseDescriptionConversation'
import addPeriodicExpenseConversation from '../../conversations/periodicExpenses/addPeriodicExpenseConversation'
config()

type Session = {
  expenseId: number
  messageId: number
  skip: number
}

export type MyContext = HydrateFlavor<Context> & SessionFlavor<Session> & ConversationFlavor

const bot = new Bot<MyContext>(process.env.BOT_TOKEN || '')
bot.use(hydrate())
bot.use(session({ initial: () => ({ expenseId: 0, skip: 0 }) }))
bot.use(conversations())

bot.use(createConversation(updateExpenseSumConversation))
bot.use(createConversation(updateExpenseDescriptionConversation))
bot.use(createConversation(addPeriodicExpenseConversation))

export default bot
