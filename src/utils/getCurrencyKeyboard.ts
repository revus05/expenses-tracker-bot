import { InlineKeyboard } from 'grammy'
import { currencyCodes, currencyCodesWithFlags } from '../data/currencies'

type GetCurrencyKeyboard = () => InlineKeyboard

const getCurrencyKeyboard: GetCurrencyKeyboard = () => {
  const keyboard = new InlineKeyboard()
  currencyCodesWithFlags.forEach((currency, i) => {
    keyboard.text(currency, `set_preferred_currency_${currencyCodes[i]}`)
    if (i % 4 == 3) {
      keyboard.row()
    }
  })

  return keyboard
}

export default getCurrencyKeyboard
