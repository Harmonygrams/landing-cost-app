import { amountToPercentageConverter } from "./amountToPercentageConverter"
import { secondaryToPrimaryCurrencyConverter } from "./secondaryToPrimaryCurrencyConverter"
const computeLandingAmount = (expensesArray, otherExpenses, product, rate, percentageToAmountConverter) => {
        const moneySpentInBuyingAllItems = (product.amount * rate)
        const vatInAmount = percentageToAmountConverter(product.vat, moneySpentInBuyingAllItems)
        const dutyInAmount = percentageToAmountConverter(product.duty, moneySpentInBuyingAllItems)
        const inProductAmount = moneySpentInBuyingAllItems
        //percentage from the total amount of all the items in the array
        const allAmountsSpentOnItemsArray = expensesArray.map(productItem => Number(productItem.amount))
        const sumOfAllAmounts = allAmountsSpentOnItemsArray.reduce((accumulator, current) => accumulator + current)
        const sumOfAllAmountsInLocalCurrency = secondaryToPrimaryCurrencyConverter(rate, sumOfAllAmounts)
        //getting the percentage of the item to the whole item in the array 
        const percentage = amountToPercentageConverter(inProductAmount, sumOfAllAmountsInLocalCurrency)
        const fractionOfPercentageFromOtherExpensesInAmount = percentageToAmountConverter(percentage, otherExpenses)
        const totalAmountSpentOnOneItem = fractionOfPercentageFromOtherExpensesInAmount + moneySpentInBuyingAllItems
        return Math.round((totalAmountSpentOnOneItem + vatInAmount + dutyInAmount) * 100) / 100 
}

export { computeLandingAmount }