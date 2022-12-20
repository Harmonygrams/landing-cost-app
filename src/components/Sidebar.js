import {MdOutlineInventory} from 'react-icons/md'
import {FiShoppingBag} from 'react-icons/fi'
import {BsCartCheck} from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { actions as sidebarActions } from './../store/sidebarSlice/sidebarSlice'
import { useEffect, useState } from 'react'
import { fetchDefaultCurrencies } from '../api/fetchDefaultCurrencies'
import { actions as settingActions } from '../store/settingSlice/settingSlice'
const Sidebar = () => {
    const [currency, setCurrency] = useState({
        primaryCurrency : {
            name : "", 
            code : "", 
            symbol : "",
        }, 
        secondaryCurrency : {
            name : "", 
            code : "", 
            symbol : ""
        }
    })
    const currentPage = useSelector(state => state.sidebar.currentPage)
    const dispatch = useDispatch()
    useEffect(() => {
        fetchDefaultCurrencies(setCurrency)
    }, [])
    useEffect(() => {
        dispatch(settingActions.setPrimaryCurrency({
            name : currency.primaryCurrency.name,
            code : currency.primaryCurrency.code,
            symbol : currency.primaryCurrency.symbol
        }))
        dispatch(settingActions.setSecondaryCurrency({
            name : currency.secondaryCurrency.name,
            code : currency.secondaryCurrency.code,
            symbol : currency.secondaryCurrency.symbol
        }))
    }, [currency])
    return(
        <aside 
            className='sidebar__container h-screen w-screen md:w-72 absolute left-0 top-0 md:relative'
            onClick={(e) => {
                if(window.innerWidth <= 768 && e.target.classList.contains('sidebar__container'))
                dispatch(sidebarActions.collapseSidebar())
            }}
        > 
            <div className='sidebar h-screen w-72 px-4 md:w-full'>
                <div className='pt-8 mx-auto'> 
                    <a href="/products" 
                        style={currentPage === "products" ?{backgroundColor : "#313030", color : "#fff"} : {backgroundColor : "transparent"}}
                        className='flex items-center text-gray-300 text-lg gap-2 mb-6 sidebar__option py-2 px-4 rounded-lg'> 
                        <FiShoppingBag />
                        Products
                    </a>
                    <a href="/expenses" 
                        style={currentPage === "expenses" ?{backgroundColor : "#313030", color : "#fff"} : {backgroundColor : "transparent"}}
                        className='flex items-center text-gray-300 text-lg gap-2 mb-6 sidebar__option py-2 px-4 rounded-lg'> 
                        <MdOutlineInventory />
                        Expenses
                    </a>
                    <a href="/orders"
                        style={currentPage === "orders" ?{backgroundColor : "#313030", color : "#fff"} : {backgroundColor : "transparent"}}
                        className='flex items-center text-gray-300 text-lg gap-2 mb-6 sidebar__option py-2 px-4 rounded-lg'> 
                        <BsCartCheck />
                        Orders
                    </a>
                    <a href="/settings"
                        style={currentPage === "settings" ?{backgroundColor : "#313030", color : "#fff"} : {backgroundColor : "transparent"}}
                        className='flex items-center text-gray-300 text-lg gap-2 mb-6 sidebar__option py-2 px-4 rounded-lg'> 
                        <IoSettingsOutline />
                        Settings
                    </a>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar