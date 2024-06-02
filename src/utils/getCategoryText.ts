import { $Enums } from '@prisma/client'

const categories = new Map<$Enums.ExpenseCategory | string | '', string>()
categories.set('GROCERIES', '🍎 Продукты')
categories.set('DINING_OUT', '🍽️ Рестораны и кафе')
categories.set('HOUSING', '🏠 Жилье')
categories.set('UTILITIES', '💡 Коммунальные услуги')
categories.set('TRANSPORTATION', '🚗 Транспорт')
categories.set('CAR_EXPENSES', '🚘 Автомобильные расходы')
categories.set('INSURANCE', '🛡️ Страхование')
categories.set('HEALTHCARE', '🏥 Медицина и здоровье')
categories.set('MEDICATIONS', '💊 Лекарства')
categories.set('CLOTHING_FOOTWEAR', '👗 Одежда и обувь')
categories.set('ENTERTAINMENT', '🎉 Развлечения и досуг')
categories.set('FITNESS_SPORTS', '🏋️ Фитнес и спорт')
categories.set('TRAVEL', '✈️ Путешествия')
categories.set('EDUCATION', '🎓 Образование')
categories.set('PETS', '🐶 Домашние животные')
categories.set('GIFTS_DONATIONS', '🎁 Подарки и пожертвования')
categories.set('LOANS_DEBTS', '💸 Кредиты и долги')
categories.set('INVESTMENTS_SAVINGS', '💰 Инвестиции и сбережения')
categories.set('COMMUNICATION_INTERNET', '📱 Связь и интернет')
categories.set('MISCELLANEOUS', '🔍 Разные расходы')

type GetCategoryValue = (category: $Enums.ExpenseCategory | string | undefined | null) => string

const getCategoryText: GetCategoryValue = category => {
  return categories.get(category || '') || ''
}

export default getCategoryText
