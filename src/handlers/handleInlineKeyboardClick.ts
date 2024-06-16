import { MyContext } from '../utils/init/bot'
import addCategoryCallback from './callbacks/expenses/addCategoryCallback'
import setPreferredCurrencyCallback from './callbacks/setPreferredCurrencyCallback'
import listCallback from './callbacks/expenses/listCallback'
import expenseCallback from './callbacks/expenses/expenseCallback'
import deleteExpenseCallback from './callbacks/expenses/deleteExpenseCallback'
import updateExpenseSumCallback from './callbacks/expenses/updateExpenseSumCallback'
import updateExpenseCurrencyCallback from './callbacks/expenses/updateExpenseCurrencyCallback'
import updateExpenseChosenCurrencyCallback from './callbacks/expenses/updateExpenseChosenCurrencyCallback'
import updateExpenseCategoryCallback from './callbacks/expenses/updateExpenseCategoryCallback'
import updateExpenseChosenCategoryCallback from './callbacks/expenses/updateExpenseChosenCategoryCallback'
import updateExpenseDescription from './callbacks/expenses/updateExpenseDescription'
import addPeriodicExpenseCallback from './callbacks/periodicExpenses/addPeriodicExpenseCallback'

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

  if (ctx.callbackQuery?.data?.includes(`addPeriodicExpense`)) {
    await addPeriodicExpenseCallback(ctx)
  }
}

export default handleInlineKeyboardClick
