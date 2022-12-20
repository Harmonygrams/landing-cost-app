import { secondaryToPrimaryCurrencyConverter } from './secondaryToPrimaryCurrencyConverter'
import { percentageToAmountConverter } from "./percentageToAmountConverter"
import { amountToPercentageConverter } from './computingLandingAmount'
const computeLandingAmountWithExpenses = (totalExpenses, allproductsArray, amount, vat, duty, rate) => {
    const amountInPrimaryCurrency = secondaryToPrimaryCurrencyConverter(rate, amount)
    const vatInAmount = percentageToAmountConverter(vat, amountInPrimaryCurrency) 
    const dutyInAmount = percentageToAmountConverter(duty, amountInPrimaryCurrency)
    //to get the total amount spent in buying one of the items,
    //add the cost price, vat, duty and percentage in expenses
    const totalInProductCost = amountInPrimaryCurrency + vatInAmount + dutyInAmount
    //we have to get the percentage of buying this item from the total expenses
    const arrayOfAmounts = allproductsArray.map(product => product.amount)
    const totalOfAmounts = arrayOfAmounts.reduce((accumulator, current) =>  accumulator + current)
    const percentageOfProduct = amountToPercentageConverter(totalInProductCost, totalOfAmounts)
    return percentageOfProduct
}
export {computeLandingAmountWithExpenses}