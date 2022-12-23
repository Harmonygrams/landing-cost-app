import {MdArrowBackIosNew, MdOtherHouses} from 'react-icons/md'
import {fetchOrders} from '../../api/fetchOrders'
import { useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import ReviewOrderListItem from './ReviewOrderListItem'
import { useParams } from 'react-router-dom'
const ReviewOrder = () => {
    const params = useParams()
    const [order, setOrders] = useState({
        itemsPurchasedArray : [], 
        currency : {
            primaryCurrency : "", 
            secondaryCurrency : "",
        }

    })
    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString()
        return formattedDate
    }
    const [onPageDataLoader, setOnPageDataLoader] = useState({
        orders : true,
    })
    const renderOrders = useMemo(() => order, [order])
    useEffect(() => {
        fetchOrders(setOrders, setOnPageDataLoader, {id : params.id})
    }, [])
    return(
        <div className="h-full">
            <div className="flex items-center gap-2 mt-2 text-blue-600 text-sm py-4">
                <MdArrowBackIosNew />
                <a 
                    href="/orders"
                    className="underline"
                > Back to orders</a>
            </div> 
            <div className='bg-white h-full rounded-lg px-6 overflow-y-scroll py-6'>
                <div className='text-center text-white py-2 rounded-lg mt-1'> 
                    <h1 className="text-xl font-semibold text-black text-gray-600"> Order Summary </h1> 
                </div>
                <div>
                    <p className='text-gray-700'> Your fulfilled order details </p>
                </div>
                <div className='flex justify-between flex-wrap gap-4 border-y-2 py-6 mt-4'> 
                    <div>
                        <h4 className='text-gray-500 text-sm'> Order Date </h4>
                        <p className='text-gray-800 text-sm'>{formatDate(order.date)}</p>
                    </div>
                    <div>
                        <h4 className='text-gray-500 text-sm'> Rate </h4>
                        <p className='text-gray-800 text-sm'>
                            1 {order.currency.secondaryCurrency.code} = {order.currency.rate} {order.currency.primaryCurrency.code}
                        </p>
                    </div>
                    <div>
                        <h4 className='text-gray-500 text-sm'> Commission </h4>
                        <p className='text-gray-800 text-sm'>{order.currency.primaryCurrency.symbol} {Number(order.commission).toLocaleString()}</p>
                    </div>
                    <div>
                        <h4 className='text-gray-500 text-sm'> Total Amount </h4>
                        <p className='text-gray-800 text-sm'>{order.currency.primaryCurrency.symbol} {Number(order.landingAmountTotal).toLocaleString()}</p>
                    </div>
                </div>
                <div>
                    <p className='text-gray-700'> Items </p>
                </div>
                <ul className=''>
                    {order.itemsPurchasedArray.map(product => (
                        <ReviewOrderListItem 
                            key={nanoid()}
                            name = {product.item}
                            description = {product.description}
                            quantity = {product.quantity}
                            rate = {product.rate}
                            amount = {product.amount}
                            currency = {order.currency}
                            vat = {product.vat}
                            duty = {product.duty}
                            productArray = {order.itemsPurchasedArray}
                            commission = {order.commission}
                            expensesArray = {order.otherExpensesArray}
                            totalExpenses = {order.totalExpensesOnOtherItems}
                        />
                    ))
                    }
                </ul>
            </div> 
        </div>
    )
}
export default ReviewOrder

