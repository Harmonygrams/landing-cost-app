import {useState, useEffect} from 'react'
import { fetchRate } from '../../api/fetchRate'
import { useSelector } from "react-redux"
const Total = () => {
    const total = useSelector(state=> state.expense.total)
    const [currencySymbol, setCurrencySymbol] = useState({
        secondaryCurrency : {
            name : '',
            code : '', 
            symbol : '',
        }
    })
    useEffect(() => {
        fetchRate(setCurrencySymbol)
    }, [])
    return(
        <div className="mt-2 mb-2 px-4"> 
            <h3 className="text-right text-xl text-gray-600">Total : <span className="font-bold">{currencySymbol.secondaryCurrency.symbol} {total.toLocaleString('en-US')}</span></h3>
        </div>
    )
}
export default Total