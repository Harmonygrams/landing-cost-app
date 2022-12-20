const computeLandingCost = (expensesArray, otherExpenses, product, rate, percentageToAmountConverter) => {
    if(expensesArray.length === 1){
        //To compute the total cost for one item 
        //we simply add the totalExpenses + the dividend of otherExpenses/quantity
        const sumOfExpenses = Number(product.rate * rate) + (Number(otherExpenses) / Number(product.quantity))
        //value in local currency and value in foreign currency 
        const computedLandingCost = Math.round(sumOfExpenses * 100) / 100
        return (computedLandingCost + percentageToAmountConverter(product.vat, product.rate * rate) + percentageToAmountConverter(product.duty, product.rate * rate))
    }if(expensesArray.length >= 2){
        const allAmountsSpentOnItemsArray = expensesArray.map(productItem => Number(productItem.amount))
        //100% of the expenses is sumofAllAmounts 
        const sumOfAllAmounts = allAmountsSpentOnItemsArray.reduce((accumulator, current) => accumulator + current)
        //100% of all the money spent on other things in otherExpenses 
        //fetchting the percentage of the current item ((amount * 100) / sumOfAllAmounts)
        const percentageOfCurrentItem = (Number(product.amount) * 100) / (sumOfAllAmounts)
        const percentageOfCurrentItemRounded = Math.round(percentageOfCurrentItem * 100) / 100
        //percentage of current item in other expenses  will be the ((percentage + otherExpenses ) / 100)
        const percentageOfCurrentItemInOtherExpenses = (percentageOfCurrentItemRounded  * otherExpenses) / 100
        //amount of current item in other expenses will be (percentageOfCurrentItemInOtherExpenses + amount) / quantity
        const amountOfCurrentItmeInOtherExpenses = (percentageOfCurrentItemInOtherExpenses + (product.amount * rate)) / product.quantity
        //The estimated landing cost 
        const computedLandingCost = Math.round(amountOfCurrentItmeInOtherExpenses * 100) / 100
        return (computedLandingCost + percentageToAmountConverter(product.vat, product.rate * rate) + percentageToAmountConverter(product.duty, product.rate * rate))
    }
}
export { computeLandingCost }