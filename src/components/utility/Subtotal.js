import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchRate } from '../../api/fetchRate'
const Subtotal = () => {
    const subtotal = useSelector(state=> state.expense.subtotal)
    const [currencySymbol, setCurrencySymbol] = useState({
        primaryCurrency : {
            name : '',
            code : '', 
            symbol : '',
        }
    })
    useEffect(() => {
        fetchRate(setCurrencySymbol)
    }, [])
    return(
        <div className="mt-8 px-4"> 
            <h3 className="text-right text-xl text-gray-600">Subtotal : <span className="font-bold">{currencySymbol.primaryCurrency.symbol} {subtotal.toLocaleString('en-US')}</span></h3>
        </div>
    )
}
export default Subtotal