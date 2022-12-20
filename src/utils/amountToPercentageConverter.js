const amountToPercentageConverter = (fractionalAmount, totalAmount) => {
    const percentage = (100 * fractionalAmount) / totalAmount
    return percentage
}
export { amountToPercentageConverter }