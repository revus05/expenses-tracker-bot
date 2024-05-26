import getCategoryValue from "../utils/getCategoryValue";
import { MyContext, UserState } from "../index";
import { Expense, ExpenseCategory } from "@prisma/client";
import prisma from "../../prisma/client/prismaClient";
import getAddedNewExpenseText from "../replies/addedNewExpense";

type HandleInlineKeyboardClick = (
  ctx: MyContext,
  userStates: Record<number, UserState>,
) => Promise<void>;

const handleInlineKeyboardClick: HandleInlineKeyboardClick = async (
  ctx,
  userStates,
) => {
  await ctx.answerCallbackQuery(
    `Выбрано: ${getCategoryValue(ctx.callbackQuery?.data)}`,
  );

  if (userStates[ctx.from?.id || 0].firstNumber) {
    const expense: Expense = await prisma.expense.create({
      data: {
        sum: userStates[ctx.from?.id || 0].firstNumber || 0,
        userId: ctx.from?.id || 0,
        category: ctx.callbackQuery?.data as ExpenseCategory,
      },
    });
    const total = await prisma.expense.aggregate({
      _sum: {
        sum: true,
      },
      where: {
        userId: ctx.from?.id,
      },
    });
    await ctx.callbackQuery?.message?.editText(
      await getAddedNewExpenseText(expense, total._sum.sum || 0),
      {
        reply_markup: undefined,
      },
    );
    userStates[ctx.from?.id || 0].firstNumber = 0;
  }
};

export default handleInlineKeyboardClick;
