import { $Enums } from '@prisma/client'

const currencies = new Map<$Enums.Currency, string>()
currencies.set('USD', '$') // Доллар США
currencies.set('EUR', '€') // Евро
currencies.set('JPY', '¥') // Японская иена
currencies.set('GBP', '£') // Британский фунт стерлингов
currencies.set('AUD', 'A$') // Австралийский доллар
currencies.set('CAD', 'C$') // Канадский доллар
currencies.set('CHF', 'CHF') // Швейцарский франк
currencies.set('CNY', '¥') // Китайский юань
currencies.set('HKD', 'HK$') // Гонконгский доллар
currencies.set('NZD', 'NZ$') // Новозеландский доллар
currencies.set('SEK', 'kr') // Шведская крона
currencies.set('KRW', '₩') // Южнокорейская вона
currencies.set('SGD', 'S$') // Сингапурский доллар
currencies.set('NOK', 'kr') // Норвежская крона
currencies.set('MXN', '$') // Мексиканский песо
currencies.set('INR', '₹') // Индийская рупия
currencies.set('RUB', '₽') // Российский рубль
currencies.set('ZAR', 'R') // Южноафриканский рэнд
currencies.set('TRY', '₺') // Турецкая лира
currencies.set('BRL', 'R$') // Бразильский реал
currencies.set('TWD', 'NT$') // Новый тайваньский доллар
currencies.set('DKK', 'kr') // Датская крона
currencies.set('PLN', 'zł') // Польский злотый
currencies.set('THB', '฿') // Тайский бат
currencies.set('MYR', 'RM') // Малайзийский ринггит
currencies.set('IDR', 'Rp') // Индонезийская рупия
currencies.set('HUF', 'Ft') // Венгерский форинт
currencies.set('CZK', 'Kč') // Чешская крона
currencies.set('ILS', '₪') // Израильский шекель
currencies.set('CLP', '$') // Чилийский песо
currencies.set('PHP', '₱') // Филиппинское песо
currencies.set('AED', 'د.إ') // Дирхам ОАЭ
currencies.set('COP', '$') // Колумбийский песо
currencies.set('SAR', 'ر.س') // Саудовский риял
currencies.set('RON', 'lei') // Румынский лей
currencies.set('BGN', 'лв') // Болгарский лев
currencies.set('KZT', '₸') // Казахстанский тенге
currencies.set('BYN', 'BYN') // Белорусский рубль

export const currencyCodesWithFlags = [
  '🇺🇸 USD', // Доллар США
  '🇪🇺 EUR', // Евро
  '🇯🇵 JPY', // Японская иена
  '🇬🇧 GBP', // Британский фунт стерлингов
  '🇦🇺 AUD', // Австралийский доллар
  '🇨🇦 CAD', // Канадский доллар
  '🇨🇭 CHF', // Швейцарский франк
  '🇨🇳 CNY', // Китайский юань
  '🇭🇰 HKD', // Гонконгский доллар
  '🇳🇿 NZD', // Новозеландский доллар
  '🇸🇪 SEK', // Шведская крона
  '🇰🇷 KRW', // Южнокорейская вона
  '🇸🇬 SGD', // Сингапурский доллар
  '🇳🇴 NOK', // Норвежская крона
  '🇲🇽 MXN', // Мексиканский песо
  '🇮🇳 INR', // Индийская рупия
  '🇷🇺 RUB', // Российский рубль
  '🇿🇦 ZAR', // Южноафриканский рэнд
  '🇹🇷 TRY', // Турецкая лира
  '🇧🇷 BRL', // Бразильский реал
  '🇹🇼 TWD', // Новый тайваньский доллар
  '🇩🇰 DKK', // Датская крона
  '🇵🇱 PLN', // Польский злотый
  '🇹🇭 THB', // Тайский бат
  '🇲🇾 MYR', // Малайзийский ринггит
  '🇮🇩 IDR', // Индонезийская рупия
  '🇭🇺 HUF', // Венгерский форинт
  '🇨🇿 CZK', // Чешская крона
  '🇮🇱 ILS', // Израильский шекель
  '🇨🇱 CLP', // Чилийский песо
  '🇵🇭 PHP', // Филиппинское песо
  '🇦🇪 AED', // Дирхам ОАЭ
  '🇨🇴 COP', // Колумбийский песо
  '🇸🇦 SAR', // Саудовский риял
  '🇷🇴 RON', // Румынский лей
  '🇧🇬 BGN', // Болгарский лев
  '🇰🇿 KZT', // Казахстанский тенге
  '🇧🇾 BYN', // Белорусский рубль
]

export const currencyCodes: $Enums.Currency[] = [
  'USD', // Доллар США
  'EUR', // Евро
  'JPY', // Японская иена
  'GBP', // Британский фунт стерлингов
  'AUD', // Австралийский доллар
  'CAD', // Канадский доллар
  'CHF', // Швейцарский франк
  'CNY', // Китайский юань
  'HKD', // Гонконгский доллар
  'NZD', // Новозеландский доллар
  'SEK', // Шведская крона
  'KRW', // Южнокорейская вона
  'SGD', // Сингапурский доллар
  'NOK', // Норвежская крона
  'MXN', // Мексиканский песо
  'INR', // Индийская рупия
  'RUB', // Российский рубль
  'ZAR', // Южноафриканский рэнд
  'TRY', // Турецкая лира
  'BRL', // Бразильский реал
  'TWD', // Новый тайваньский доллар
  'DKK', // Датская крона
  'PLN', // Польский злотый
  'THB', // Тайский бат
  'MYR', // Малайзийский ринггит
  'IDR', // Индонезийская рупия
  'HUF', // Венгерский форинт
  'CZK', // Чешская крона
  'ILS', // Израильский шекель
  'CLP', // Чилийский песо
  'PHP', // Филиппинское песо
  'AED', // Дирхам ОАЭ
  'COP', // Колумбийский песо
  'SAR', // Саудовский риял
  'RON', // Румынский лей
  'BGN', // Болгарский лев
  'KZT', // Казахстанский тенге
  'BYN', // Белорусский рубль
]

const currenciesWithFlags = new Map<$Enums.Currency, string>()
currencyCodes.forEach((code, i) => {
  currenciesWithFlags.set(code, currencyCodesWithFlags[i])
})

export const getCurrencyCodeWithFlag = (code: $Enums.Currency) => {
  return currenciesWithFlags.get(code)
}

export default currencies
