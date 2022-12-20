import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions as expenseActions} from '../../store/expenseSlice/expenseSlice'
const ExpenseCards = ({name, isMandatory, id}) => {
    const currency = useSelector(state => state.setting.currency)
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    useEffect(() => {
        const addSubtotal = (e) => {
            if(e.target.classList.contains('expense__card')){
                dispatch(expenseActions.addSubtotal({id :id, value : value, name, isMandatory}))
                window.localStorage.setItem(id, value)
            }
        }
        document.addEventListener('focusout', addSubtotal)
        return () => document.removeEventListener('focusout', addSubtotal)
    }, [value])
    useEffect(() => {
        //check if value exists in localStorage 
        const fetchValueStoredInLocalStorage = localStorage.getItem(id) 
        if(fetchValueStoredInLocalStorage){
            setValue(fetchValueStoredInLocalStorage)
        }
    })
    return(
    <div className="w-full md:w-1/3"> 
        <div className='flex items-center bg-black  border-2 border-gray-300 rounded-lg px-1 py-1 gap-2 mt-2 justify-center  cursor-pointer mx-2 '>
            <p className='py-2 px-4 text-white rounded-lg md:inline-block text-gray-800 w-2/3 text-center'>{name}</p>
            <input
                className = "p-2 rounded-lg text-right border-2 md:inline-block md:ml-4 text-gray-600 w-1/3 expense__card outline-none"
                placeholder={`${currency.primaryCurrency.symbol} 0.00`}
                required = {isMandatory && true}
                value = {value}
                onChange = {(e) => {
                    const isValueStoredInLocalStorage = window.localStorage.getItem(id)
                    if(isValueStoredInLocalStorage) window.localStorage.removeItem(id)
                    setValue(e.target.value)}
                }
            />
        </div>
    </div>
    )
}
export default ExpenseCards