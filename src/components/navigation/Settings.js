import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import CurrencySelector from '../utility/CurrencySelector'
import { actions as sidebarActions} from '../../store/sidebarSlice/sidebarSlice'
const Settings = () => {
    const dispatch = useDispatch()
    const [enableCurrencySettingsPage, setEnableCurrencySettingsPage] = useState(false)
    useEffect(() => {
        document.title = "Settings"
        dispatch(sidebarActions.setCurrentPage('settings'))
    })
    return(
        <div className="">
            <div 
                className="border-2 p-4 mt-8 hover:bg-gray-200 transition cursor-pointer shadow-lg rounded-lg bg-white"
                onClick={() => setEnableCurrencySettingsPage(true)}
            >
                <h4 className="text-xl font-semibold"> Currency</h4>
                <p className="mt-2">Set the default to your local currency</p>
            </div>
            {enableCurrencySettingsPage && <CurrencySelector closeWindow={() => setEnableCurrencySettingsPage(false)}/>}
        </div>
    )
}
export default Settings