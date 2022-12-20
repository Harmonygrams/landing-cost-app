import {HiMenuAlt3} from 'react-icons/hi'
import {actions as sidebarActions} from '../store/sidebarSlice/sidebarSlice'
import { useDispatch, useSelector } from 'react-redux'
const Navbar = () => {
    const currentPage = useSelector(state => state.sidebar.currentPage)
    let displayPage = ""
    const dispatch = useDispatch()
    const toggleSidebar = () => {
        dispatch(sidebarActions.toggleSidebar())
    }
    switch(currentPage){
        case "products" : 
            displayPage = "Products" 
            break 
        case "expenses" :
            displayPage = "Expenses" 
            break 
        case "orders" : 
            displayPage = "Orders"
            break 
        case "settings" : 
            displayPage = "Settings"
            break
        case "dashboard" : 
            displayPage = "Raof"
        default : 
            displayPage = "Raof"
    }
    return(
        <nav>
            <div className='flex justify-between items-start border-b-2 py-2 border-gray-200'>
                <div> 
                    <h1 className='font-medium text-xl md:text-3xl text-gray-800'>{displayPage}</h1>
                    {displayPage === "Raof" && <p className='text-sm md:text-lg font-light text-gray-600'>Good morning, welcome back 👋</p>}
                </div>
                <div 
                    className='hover:bg-gray-200 px-2 py-2 transition rounded-lg'
                    onClick = {toggleSidebar}
                > 
                    <HiMenuAlt3 
                        className='text-3xl cursor-pointer'
                    />
                </div>
            </div>
        </nav>
    )
}
export default Navbar