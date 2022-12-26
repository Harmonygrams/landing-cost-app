import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { actions as sidebarActions } from '../../store/sidebarSlice/sidebarSlice'
import {actions as expensesActions} from '../../store/expenseSlice/expenseSlice'
import { fetchDefaultCurrencies } from '../../api/fetchDefaultCurrencies'
import { IoAnalyticsSharp } from "react-icons/io5"
import { fetchOrdersCount } from "../../api/fetchOrdersCount"
import { fetchLandingAmountTotal } from "../../api/fetchLandingAmountTotal"
import { ScaleLoader } from "react-spinners"
import { BiWallet } from "react-icons/bi"
import AddOrder from "../utility/AddOrder"
import OrderTable from "../tables/OrderTable"
const Orders = () => {
    const [enableAddNewOrder, setEnableAddNewOrder] = useState(false)
    const [currency, setCurrency] = useState({
        primaryCurrency : {
            symbol : '',
        }
    })
    const [ orderCount, setOrderCount ] = useState(0)
    const [ landingAmountTotal, setLandingAmountTotal ] = useState(0)
    const [ onPageDataLoader, setOnPageDataLoader] = useState({
        orderCount : true,
        landingAmountTotal : true
    })
    const dispatch = useDispatch()
    const closeWindow = () => {
        dispatch(expensesActions.resetExpenses())
        setEnableAddNewOrder(false)
    }
    useEffect(() => {
        fetchOrdersCount(setOrderCount, setOnPageDataLoader)
        fetchLandingAmountTotal(setLandingAmountTotal, setOnPageDataLoader, '')
        fetchDefaultCurrencies(setCurrency)
        document.title = "Orders"
        window.localStorage.clear()
        dispatch(sidebarActions.setCurrentPage('orders'))
    }, [])
    console.log(currency)
    return(
        <div className = ""> 
            <div className="flex flex-col gap-4 mb-8 md:flex-row mt-4"> 
                <div className="w-full  bg-white py-4 px-6 rounded-lg hover:shadow-lg transition cursor-pointer">
                    <div>
                        <div className="bg-gray-200 inline-block p-2 rounded-lg"> 
                            <IoAnalyticsSharp 
                                className="text-2xl"
                            />
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Total orders</p>
                    <h2 className="text-2xl md:text-4xl mt-2">
                    {onPageDataLoader.orderCount ? 
                        <ScaleLoader
                        width={2} 
                        height={18}
                    />: orderCount
                    }
                    </h2>
                </div>
                <div className="w-full bg-white py-4 px-6 rounded-lg hover:shadow-lg transition cursor-pointer">
                    <div>
                        <div className="bg-gray-200 inline-block p-2 rounded-lg"> 
                            <BiWallet 
                                className="text-2xl"
                            />
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Total Expenses</p>
                    <h2 className="text-2xl md:text-4xl mt-2">
                        {
                            currency.primaryCurrency.symbol
                        } {onPageDataLoader.landingAmountTotal ? 
                            <ScaleLoader
                            width={2} 
                            height={18}
                        />: landingAmountTotal.toLocaleString()
                        }
                    </h2>
                </div>
            </div>
            <div className="flex justify-between mb-8"> 
                <input 
                    placeholder="Search Products"
                    className="text-sm md:text-sm px-4 md:px-4 py-2 md:py-2 rounded-lg transition outline-black"
                />
                <button 
                    className="add__new-button text-sm md:text-sm px-4 md:px-4 py-2 md:py-2 rounded-lg hover:bg-white border-black border-2 hover:text-black transition text-white"
                    onClick = {() => setEnableAddNewOrder(true)}
                > New order</button>
            </div>
            <OrderTable />
            {enableAddNewOrder && <AddOrder closeWindow={closeWindow}/>}
        </div>
    )
}
export default Orders