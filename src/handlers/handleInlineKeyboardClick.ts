import { MyContext } from '../utils/init/bot'
import addCategoryCallback from './callbacks/addCategoryCallback'
import setPreferredCurrencyCallback from './callbacks/setPreferredCurrencyCallback'
import listCallback from './callbacks/listCallback'
import expenseCallback from './callbacks/expenseCallback'
import deleteExpenseCallback from './callbacks/deleteExpenseCallback'
import updateExpenseSumCallback from './callbacks/updateExpenseSumCallback'
import updateExpenseCurrencyCallback from './callbacks/updateExpenseCurrencyCallback'
import updateExpenseChosenCurrencyCallback from './callbacks/updateExpenseChosenCurrencyCallback'
import updateExpenseCategoryCallback from './callbacks/updateExpenseCategoryCallback'
import updateExpenseChosenCategoryCallback from './callbacks/updateExpenseChosenCategoryCallback'
import updateExpenseDescription from './callbacks/updateExpenseDescription'

type HandleInlineKeyboardClick = (ctx: MyContext) => Promise<void>

const handleInlineKeyboardClick: HandleInlineKeyboardClick = async ctx => {
  if (ctx.callbackQuery?.data?.includes(`addCategory`)) {
    await addCategoryCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`setPreferredCurrency`)) {
    await setPreferredCurrencyCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`deleteExpense`)) {
    await deleteExpenseCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`list`)) {
    await listCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`expense`)) {
    await expenseCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`updateExpenseSum`)) {
    await updateExpenseSumCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`updateExpenseDescription`)) {
    await updateExpenseDescription(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`updateExpenseCurrency`)) {
    await updateExpenseCurrencyCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`updateExpenseChosenCurrency`)) {
    await updateExpenseChosenCurrencyCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`updateExpenseCategory`)) {
    await updateExpenseCategoryCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`updateExpenseChosenCategory`)) {
    await updateExpenseChosenCategoryCallback(ctx)
  }
}

export default handleInlineKeyboardClick
