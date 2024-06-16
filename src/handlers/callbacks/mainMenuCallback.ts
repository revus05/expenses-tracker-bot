import { MyContext } from '../../utils/init/bot'
import getMenuKeyboard from '../../utils/keyboards/getMenuKeyboard'

type MainMenuCallback = (ctx: MyContext) => Promise<void>

const mainMenuCallback: MainMenuCallback = async ctx => {
  if (!ctx.callbackQuery) {
    await ctx.reply('Error no data')
    return
  }

  await ctx.answerCallbackQuery()
  await ctx.callbackQuery.message?.editText('Ваш выбор?', {
    parse_mode: 'HTML',
    reply_markup: getMenuKeyboard(),
  })
}

export default mainMenuCallback
