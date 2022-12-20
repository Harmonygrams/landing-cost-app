const percentageToAmountConverter = (percentage, amount) => {
    //to get the amount in percentage, computed amount = percentage * amount / 100
    const percentageInAmount = (percentage * amount) / 100
    //adding percentageInAmount to amount, we have 
    return Math.round(percentageInAmount * 100) / 100
}
export {percentageToAmountConverter}