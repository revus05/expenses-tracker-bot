type GetWelcomeMessage = () => string

const defaultCurrency = '🇧🇾 BYN'

const getWelcomeMessage: GetWelcomeMessage = () => {
  return `Добро пожаловать! Отправляйте мне все свои расходы и я буду отслеживать ваши траты\n\n/set_preferred_currency - Задать валюту пользоветеля. По умолчанию - ${defaultCurrency}`
}

export default getWelcomeMessage
