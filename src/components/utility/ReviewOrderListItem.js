import { useState } from "react"
import { FiMinus } from 'react-icons/fi'
import { HiOutlinePlus, HiOutlineInformationCircle } from 'react-icons/hi'
import { RiArrowRightSLine } from 'react-icons/ri'
import { nanoid } from "nanoid"
import { secondaryToPrimaryCurrencyConverter } from '../../utils/secondaryToPrimaryCurrencyConverter'
import { percentageToAmountConverter } from '../../utils/percentageToAmountConverter'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
const ReviewOrderListItem = ({
    name, 
    description, 
    quantity, 
    currency,
    rate, 
    amount,
    vat, 
    duty, 
    productArray, 
    commission, 
    expensesArray, 
    totalExpenses}) => {
    const [productDetails,  setProductDetails] = useState({
        showDetails : false,
        showCalculation : false, 
    })
    const {symbol} = currency.primaryCurrency
    const computedVat = percentageToAmountConverter(vat, secondaryToPrimaryCurrencyConverter(currency.rate, amount))
    const computedDuty = percentageToAmountConverter(duty, secondaryToPrimaryCurrencyConverter(currency.rate, amount))
    const computedAmount = secondaryToPrimaryCurrencyConverter(currency.rate, amount)
    const computedItemTotalCost = computedAmount + computedVat + computedDuty
    const allProductsAmounts = productArray.map(product => product.amount)
    const sumOfAllProductsAmounts = allProductsAmounts.reduce((accumulator, current) => accumulator + current)
    const computedAllProductsAmount = Math.round(secondaryToPrimaryCurrencyConverter(currency.rate, sumOfAllProductsAmounts) * 100) / 100
    const percentage = Math.round(((computedAmount * 100) / computedAllProductsAmount) * 100) / 100
    const totalExpensesForOneItem = Math.round(((percentage * totalExpenses) / 100)*100)/100
    const landingAmount = computedItemTotalCost + totalExpensesForOneItem
    const landingCost = (landingAmount / quantity)
    return(
    <li 
        className='flex justify-between hover:shadow-lg rounded-lg transition mt-2 order__purchased-items-list flex-col'
        key = {nanoid()}
    >
        <div className="flex-1 px-4 py-4 grid grid-cols-3 items-center"> 
            <div className='text-ellipsis'>
                <h3 className='font-medium text-gray-700'>{name} </h3>
                <p className='font-light text-sm'> {description}</p>
            </div>
            <p className='font-medium text-xl text-gray-700 hidden sm:block text-center'> {symbol} {landingAmount.toLocaleString()} </p>
            <div className="flex justify-end"> 
                <div 
                    className='text-2xl cursor-pointer'
                    onClick={() => setProductDetails(prev =>({...prev, showDetails : !prev.showDetails}))}
                >
                    {productDetails.showDetails ? <FiMinus /> : <HiOutlinePlus />}
                </div>
            </div>
        </div>
        {productDetails.showDetails && 
        <div className="mt-4 border-t-2 flex justify-between items-start flex-wrap bg-gray-100 px-4 py-4 order__purchased-items-list-more-details-container"> 
            <div className="flex justify-between w-full flex-wrap items-start">
                <div className="">
                    <p className="font-light text-sm mb-2">Quantity : <span className="font-medium">{quantity}</span></p>
                    <p className="font-light text-sm mb-2">Rate : <span className="font-medium">{symbol} {secondaryToPrimaryCurrencyConverter(currency.rate, rate).toLocaleString()}</span></p>
                    <p className="font-light text-sm mb-2">Amount : <span className="font-medium">{symbol} {secondaryToPrimaryCurrencyConverter(currency.rate, amount).toLocaleString()}</span></p>
                    <p className="font-light text-sm mb-2">Vat ({vat}%): <span className="font-medium">{symbol} {percentageToAmountConverter(vat, secondaryToPrimaryCurrencyConverter(currency.rate, amount)).toLocaleString()}</span></p>
                    <p className="font-light text-sm mb-2">Duty ({duty}%) : <span className="font-medium">{symbol} {percentageToAmountConverter(duty, secondaryToPrimaryCurrencyConverter(currency.rate, amount)).toLocaleString()}</span></p>
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <HiOutlineInformationCircle
                            className="mb-2 cursor-pointer"
                        />
                        <p className="font-light text-sm mb-2">Landing Rate : <span className="font-medium">{symbol} {landingCost.toLocaleString()}</span></p>
                    </div> 
                    <div className="flex items-center gap-1"> 
                        <HiOutlineInformationCircle 
                            className="mb-2 cursor-pointer"
                        />
                        <p className="font-light text-sm mb-2">Landing Amount : <span className="font-medium">{symbol} {landingAmount.toLocaleString()}</span></p>
                    </div>
                </div>
            </div> 
            {productDetails.showCalculation && 
            <div className="flex w-full flex-col order__purchased-items-list-more-details-container border-2 p-2 rounded-lg my-4 flex-wrap bg-white">
                <div>
                    <p className="font-medium underline text-sm text-center"> Calculation </p>
                </div>
                <div className="flex justify-between items-start flex-wrap font-mono"> 
                    <div className="my-4">
                        <p className="text-xs mb-1">total item cost = amount + vat + duty  </p>
                        <p className="text-xs mb-1">total item cost = {symbol} {secondaryToPrimaryCurrencyConverter(currency.rate, amount).toLocaleString()} + {symbol} {percentageToAmountConverter(vat, secondaryToPrimaryCurrencyConverter(currency.rate, amount)).toLocaleString()} + {symbol} {percentageToAmountConverter(duty, secondaryToPrimaryCurrencyConverter(currency.rate, amount)).toLocaleString()} </p>
                        <p className="text-xs mb-1">total item cost = {symbol} {computedItemTotalCost.toLocaleString()} </p>
                        <p className="text-xs mb-1">total amount spent on all products : {symbol} {computedAllProductsAmount.toLocaleString()}</p>
                        <p className="text-xs mb-1">percentage = (total item cost x 100) / total amount spent on all products</p>
                        <p className="text-xs mb-1">percentage = {percentage}%</p>
                        <p className="text-xs mb-1">This item constitutes <span className="font-semibold">{percentage}%</span> of the total amount spent on all products</p>
                    </div>
                    <div className="my-4">
                        <ul>
                            {expensesArray.map(expense =>(
                                <li 
                                    className="text-xs mb-1 capitalize"
                                    key={nanoid()}
                                >{expense.name} = {symbol} {Number(expense.value).toLocaleString()}
                                </li>
                            ))
                            }
                        </ul>
                        <p className="text-xs mb-1 capitalize">commission = {symbol} {commission.toLocaleString()}</p>
                        <p className="text-xs mb-1">total expenses  = {symbol} {totalExpenses.toLocaleString()}</p>
                        <p className="text-xs mb-1">total expenses for this item = (percentage x total expenses) / 100 </p>
                        <p className="text-xs mb-1">total expenses for this item = {symbol} {totalExpensesForOneItem.toLocaleString()} </p>
                        <p className="text-xs mb-1">You spent <span className="font-semibold">{symbol} {totalExpensesForOneItem.toLocaleString()}</span> on expenses for this item</p>
                    </div>
                    <div className="my-4">
                        <p className="text-xs mb-1 capitalize"> landing amount = (total item cost + total expenses for this item)</p>
                        <p className="text-xs mb-1 capitalize">landing amount = {symbol} {computedItemTotalCost.toLocaleString()} + {symbol} {totalExpensesForOneItem.toLocaleString()}</p>
                        <p className="text-xs mb-1 capitalize">landing amount = {symbol} {landingAmount.toLocaleString()} </p>
                        <p className="text-xs mb-1 capitalize">landing cost = (landing amount / Quantity)</p>
                        <p className="text-xs mb-1 capitalize">landing cost = {symbol} {landingCost.toLocaleString()} </p>
                        <p className="text-xs mb-1 capitalize">You have to sell one of this item above <span className="font-semibold">{symbol} {landingCost.toLocaleString()}</span> to make profit</p>

                    </div>
                </div>
            </div> 
            }
            {productDetails.showCalculation ? 
            <div 
                className="w-full flex justify-center items-center underline cursor-pointer"
                onClick={() => setProductDetails(prev => ({...prev, showCalculation : false}))}
            > 
                <p 
                    className="text-xs"
                    >Hide Calculation 
                </p>
                <MdOutlineKeyboardArrowUp/>
            </div> :
            <div 
                className="w-full flex justify-center items-center underline cursor-pointer"
                onClick={() => setProductDetails(prev => ({...prev, showCalculation : true}))}
            > 
                <p 
                    className="text-xs"
                    >Show Calculation
                </p>
                <RiArrowRightSLine/>
            </div> 
            }
        </div>}
    </li>
    )
}
export default ReviewOrderListItem