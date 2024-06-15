import { hydrate, HydrateFlavor } from '@grammyjs/hydrate'
import { Bot, Context, session, SessionFlavor } from 'grammy'
import { config } from 'dotenv'
import { ConversationFlavor, conversations, createConversation } from '@grammyjs/conversations'
import updateExpenseSumConversation from '../../conversations/updateExpenseSumConversation'
import updateExpenseDescriptionConversation from '../../conversations/updateExpenseDescriptionConversation'
config()

type Session = {
  expenseId: number
  messageId: number
  skip: number
}

export type MyContext = HydrateFlavor<Context> & SessionFlavor<Session> & ConversationFlavor

const bot = new Bot<MyContext>(process.env.BOT_TOKEN || '')
bot.use(hydrate())
bot.use(session({ initial: () => ({ expenseId: 0 }) }))
bot.use(conversations())

bot.use(createConversation(updateExpenseSumConversation))
bot.use(createConversation(updateExpenseDescriptionConversation))

export default bot
