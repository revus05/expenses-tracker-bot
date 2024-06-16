import { MyContext } from '../utils/init/bot'
import addCategoryCallback from './callbacks/expenses/addCategoryCallback'
import listExpensesCallback from './callbacks/expenses/listExpensesCallback'
import expenseCallback from './callbacks/expenses/expenseCallback'
import deleteExpenseCallback from './callbacks/expenses/deleteExpenseCallback'
import updateExpenseSumCallback from './callbacks/expenses/updateExpenseSumCallback'
import updateExpenseCurrencyCallback from './callbacks/expenses/updateExpenseCurrencyCallback'
import updateExpenseChosenCurrencyCallback from './callbacks/expenses/updateExpenseChosenCurrencyCallback'
import updateExpenseCategoryCallback from './callbacks/expenses/updateExpenseCategoryCallback'
import updateExpenseChosenCategoryCallback from './callbacks/expenses/updateExpenseChosenCategoryCallback'
import updateExpenseDescription from './callbacks/expenses/updateExpenseDescription'
import addPeriodicExpenseCallback from './callbacks/periodicExpenses/addPeriodicExpenseCallback'
import listPeriodicExpensesCallback from './callbacks/periodicExpenses/listPeriodicExpensesCallback'
import mainMenuCallback from './callbacks/mainMenuCallback'
import updatePreferredChosenCurrencyCallback from './callbacks/preferedCurrency/updatePreferredChosenCurrencyCallback'
import updatePreferredCurrencyCallback from './callbacks/preferedCurrency/updatePreferredCurrencyCallback'

type HandleInlineKeyboardClick = (ctx: MyContext) => Promise<void>

const handleInlineKeyboardClick: HandleInlineKeyboardClick = async ctx => {
  // Menu
  if (ctx.callbackQuery?.data?.includes(`mainMenu`)) {
    await mainMenuCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`updatePreferredChosenCurrency`)) {
    await updatePreferredChosenCurrencyCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`updatePreferredCurrency`)) {
    await updatePreferredCurrencyCallback(ctx)
  }

  // Expenses
  if (ctx.callbackQuery?.data?.includes(`addCategory`)) {
    await addCategoryCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`deleteExpense`)) {
    await deleteExpenseCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`listExpenses`)) {
    await listExpensesCallback(ctx)
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

  // Periodic Expenses
  if (ctx.callbackQuery?.data?.includes(`addPeriodicExpense`)) {
    await addPeriodicExpenseCallback(ctx)
  }
  if (ctx.callbackQuery?.data?.includes(`listPeriodicExpenses`)) {
    await listPeriodicExpensesCallback(ctx)
  }
}

export default handleInlineKeyboardClick
