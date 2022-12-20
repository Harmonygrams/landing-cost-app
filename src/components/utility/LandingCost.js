import { IoMdArrowRoundBack } from 'react-icons/io'
import { computeLandingCost } from '../../utils/computeLandingCost'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { useEffect} from 'react'
import { secondaryToPrimaryCurrencyConverter} from '../../utils/secondaryToPrimaryCurrencyConverter'
import { computeLandingAmount } from '../../utils/computingLandingAmount'
import { percentageToAmountConverter } from '../../utils/percentageToAmountConverter'
import { addOrder } from '../../api/addOrder'
import Analytics from './Analytics'
const LandingCost = ({closeWindow}) => {
    const expensesArray = useSelector(state => state.expense.totalExpensesArray)
    const currency = useSelector(state => state.setting.currency)
    const commission = useSelector(state => (Math.round(state.expense.commission * 100) / 100) * currency.rate)
    //adding commission to the subtotal 
    const otherExpensesArray = useSelector(state => state.expense.subtotalExpensesArray)
    const subtotal = useSelector(state => state.expense.subtotal)
    const otherExpenses = (subtotal + commission)
    const allItemsQuantitiesArray = expensesArray.map(product => product.quantity)
    const allItemsCostPriceArray = expensesArray.map(product => product.rate)
    const allItemsAmountArray = expensesArray.map(product => product.amount)
    const totalQuantityOfItemsPurchased = allItemsQuantitiesArray.reduce((accumulator, current) => accumulator + current)
    const totalItemCostPrices = allItemsCostPriceArray.reduce((accumulator, current) => accumulator + current)
    const totalItemAmounts = allItemsAmountArray.reduce((accumulator, current) => accumulator  + current)
    const arrayOfLandingCost = expensesArray.map(product => {
        return computeLandingCost(expensesArray, otherExpenses, product, currency.rate, percentageToAmountConverter)
    })
    const arrayOfAmounts = expensesArray.map(product => {
        return (computeLandingAmount(
            expensesArray, 
            otherExpenses, 
            product, 
            currency.rate,
            percentageToAmountConverter,
        )
    )})
    const totalLandingCost = arrayOfLandingCost.reduce((accumulator, current) => accumulator + current)
    const totalLandingAmount = arrayOfAmounts.reduce((accumulator, current ) => accumulator + current)
    const saveOrder = () => {
        const order = {
            currency : currency,
            otherExpensesArray : otherExpensesArray,
            totalExpensesOnOtherItems : otherExpenses,
            commission : commission, 
            itemsPurchasedArray : expensesArray,
            datePurchased : new Date(), 
            landingAmountTotal : totalLandingAmount, 
            landingCostTotal : totalLandingCost,
        }
        addOrder(order)
    }
    useEffect(() => {
        const enableTootip = (e) => {
            if(e.target.classList.contains('tooltip-text')){
                const toolTip = e.target
                const toolTipContainer = toolTip.previousElementSibling
                toolTipContainer.style.display = "block"
            }
        }
        const disableTooltip = (e) => {
            if(e.target.classList.contains('tooltip-text')){  
                const toolTip = e.target
                const toolTipContainer = toolTip.previousElementSibling
                toolTipContainer.style.display = "none"
            }
        }
        document.addEventListener('mouseover', enableTootip)
        document.addEventListener('mouseout', disableTooltip)
        return () =>{
            document.removeEventListener('mouseover', enableTootip)
            document.removeEventListener('mouseout', disableTooltip)
        } 
    }, [])
    return(
        <div className="absolute h-screen w-full px-4 py-8 bg-white overflow-y-scroll">
            <div className='flex gap-2 md:gap-8 justify-between'> 
                <div 
                    className='hover:bg-gray-200 inline-block p-2 rounded-lg cursor-pointer border-2 border-gray-400'
                    onClick={() => closeWindow()}
                    >
                    <IoMdArrowRoundBack
                        className='text-lg font-bold'
                    />
                </div>
                <div> 
                    <button 
                                className='border-2 px-4 py-2 text-sm rounded-lg hover:text-white hover:bg-gray-800 border-gray-800'
                                onClick={saveOrder}
                            >Save
                    </button>
                </div>
            </div>
            <div className='text-center bg-black text-white py-2 rounded-lg mb-4 mt-8'> 
                <h1 className="text-xl font-semibold"> Estimated Landing Cost</h1> 
                <p> (Expenses Included)</p>
            </div>
            <table className='w-full'>
                <thead> 
                    <tr key={nanoid()}> 
                        <th className='text-left landing__cost-table px-4 py-2'>Item</th>
                        <th className='text-left landing__cost-table px-4 py-2'> Quantity </th>
                        <th className='text-left landing__cost-table px-4 py-2'>Landing Cost</th>
                        <th className='text-left landing__cost-table px-4 py-2'>Charges</th>
                        <th className='text-left landing__cost-table px-4 py-2'>Landing Amount</th>
                    </tr>
                </thead>
                <tbody> 
                    {
                        expensesArray.map(product => (
                            <tr key={product}> 
                                <td className='landing__cost-table px-4 py-2'>{product.item}</td>
                                <td className='landing__cost-table px-4 py-2'>{product.quantity}</td>
                                <td className='landing__cost-table px-4 py-2'>
                                    {currency.primaryCurrency.symbol} {
                                        computeLandingCost(
                                            expensesArray, 
                                            otherExpenses, 
                                            product, 
                                            currency.rate,
                                            percentageToAmountConverter,
                                        ).toLocaleString()
                                    }
                                </td>
                                <td className='landing__cost-table px-4 py-2 relative charges__column'>
                                    <div className='bg-black text-white absolute w-[50%] bottom-[100%] rounded-lg px-2 py-1 tooltip__container hidden'>
                                        <small className='block'>{`${product.vat}% Vat`}</small>
                                        <small className='block'>{`${product.duty}% Duty Charges`}</small>
                                    </div>
                                    <span 
                                        style={{ backgroundColor : (product.vat === 0 && product.duty) === 0 ? "#16a449" : "#ca8b02"}}
                                        className='bg-green-600 text-white text-xs italic capitalize py-1 px-4 rounded-lg cursor-pointer tooltip-text'
                                    >{(product.vat === 0 && product.duty) === 0 ? "0% fee" : "extra fees"}
                                    </span>
                                </td>
                                <td className='landing__cost-table px-4 py-2'>{currency.primaryCurrency.symbol} {computeLandingAmount(
                                            expensesArray, 
                                            otherExpenses, 
                                            product, 
                                            currency.rate,
                                            percentageToAmountConverter,
                                        ).toLocaleString()
                                    }</td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot> 
                    <tr> 
                        <td className='landing__cost-table px-4 py-2 font-bold'>Total</td>
                        <td className='landing__cost-table px-4 py-2 font-bold'>{totalQuantityOfItemsPurchased}</td>
                        <td className='landing__cost-table px-4 py-2 font-bold'>{currency.primaryCurrency.symbol} {totalLandingCost.toLocaleString()}</td>
                        <td className='landing__cost-table px-4 py-2 relative charges__column'>
                            <div className='bg-black text-white absolute w-[50%] bottom-[100%] rounded-lg px-2 py-1 tooltip__container hidden'>
                                    <small className='block'>{`${currency.primaryCurrency.symbol} ${commission.toLocaleString()}`}</small>
                                </div>
                                <span 
                                    style={{ backgroundColor : commission === 0 ? "#16a449" : "#EF4444"}}
                                    className='bg-green-600 text-white text-xs italic capitalize py-1 px-4 rounded-lg cursor-pointer tooltip-text'
                                >{commission=== 0 ? "no commission" : "commission"}
                                </span>
                            </td>
                        <td className='landing__cost-table px-4 py-2 font-bold'>{currency.primaryCurrency.symbol} {(totalLandingAmount).toLocaleString()}</td>
                    </tr>
                </tfoot>
            </table>
            <p className='text-xs text-red-500 mt-2 font-semibold'>* commissions are added to the landing cost and landing amount</p>
            <div className='mt-4 py-4'> 
            <Analytics
                productNames = {expensesArray.map(product => product.item)}
                landingPrices = {arrayOfLandingCost}
                landingAmounts = {arrayOfAmounts}
            />
            <div className=' text-center bg-black text-white py-2 rounded-lg'> 
                    <h1 className="text-xl font-semibold"> Estimated Landing Cost</h1> 
                </div>
            </div>
            <table className='w-full'>
                <thead> 
                    <tr key={nanoid()}> 
                        <th className='text-left landing__cost-table px-4 py-2'>Item</th>
                        <th className='text-left landing__cost-table px-4 py-2'> Quantity </th>
                        <th className='text-left landing__cost-table px-4 py-2'>Cost Price</th>
                        <th className='text-left landing__cost-table px-4 py-2'>Amount</th>
                        <th className='text-left landing__cost-table px-4 py-2'>Landing Cost</th>
                    </tr>
                </thead>
                <tbody> 
                    {
                        expensesArray.map(product => (
                            <tr key={product}> 
                                <td className='landing__cost-table px-4 py-2'>{product.item}</td>
                                <td className='landing__cost-table px-4 py-2'>{product.quantity}</td>
                                <td className='landing__cost-table px-4 py-2'>{currency.primaryCurrency.symbol} {secondaryToPrimaryCurrencyConverter(currency.rate, product.rate).toLocaleString()}</td>
                                <td className='landing__cost-table px-4 py-2'>{currency.primaryCurrency.symbol} {secondaryToPrimaryCurrencyConverter(currency.rate, product.amount).toLocaleString()}</td>
                                <td className='landing__cost-table px-4 py-2'>
                                    {currency.primaryCurrency.symbol} {
                                        computeLandingCost(
                                            expensesArray,
                                            otherExpenses, 
                                            product, 
                                            currency.rate,
                                            percentageToAmountConverter,
                                        ).toLocaleString()
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot> 
                    <tr> 
                        <td className='landing__cost-table px-4 py-2 font-bold'>Total</td>
                        <td className='landing__cost-table px-4 py-2 font-bold'>{totalQuantityOfItemsPurchased}</td>
                        <td className='landing__cost-table px-4 py-2 font-bold'>{currency.primaryCurrency.symbol} {(totalItemCostPrices * currency.rate).toLocaleString()}</td>
                        <td className='landing__cost-table px-4 py-2 font-bold'>{currency.primaryCurrency.symbol} {(totalItemAmounts * currency.rate).toLocaleString()}</td>
                        <td className='landing__cost-table px-4 py-2 font-bold'>{currency.primaryCurrency.symbol} {totalLandingCost.toLocaleString()}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default LandingCost
