-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'TRY', 'BRL', 'TWD', 'DKK', 'PLN', 'THB', 'MYR', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED', 'COP', 'SAR', 'RON', 'BGN', 'KZT', 'BYN');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('GROCERIES', 'DINING_OUT', 'HOUSING', 'UTILITIES', 'TRANSPORTATION', 'CAR_EXPENSES', 'INSURANCE', 'HEALTHCARE', 'MEDICATIONS', 'CLOTHING_FOOTWEAR', 'ENTERTAINMENT', 'FITNESS_SPORTS', 'TRAVEL', 'EDUCATION', 'PETS', 'GIFTS_DONATIONS', 'LOANS_DEBTS', 'INVESTMENTS_SAVINGS', 'COMMUNICATION_INTERNET', 'MISCELLANEOUS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "preferredCurrency" "Currency" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sum" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'BYN',
    "category" "ExpenseCategory" NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
