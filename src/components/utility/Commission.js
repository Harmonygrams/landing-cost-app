import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions as expenseActions } from '../../store/expenseSlice/expenseSlice'
const Commission = () => {
    const dispatch = useDispatch()
    const [commission, setCommission] = useState(0)
    const updateCommission = (e) => {
        setCommission(e.target.value)
    }
    useEffect(() => {
        dispatch(expenseActions.setCommission({
        commission : Number(commission)
        }))
    }, [commission])
    const currency = useSelector(state => state.setting.currency.secondaryCurrency)
    return(
    <div className=''>
        <div className='flex gap-2 border-2 max-w-min rounded-lg overflow-hidden py-2 px-2 bg-black items-center'>
            <p className='text-gray-600 text-white px-2'>Commission</p>
            <input                           
                className='outline-none w-28 border-2 px-2 py-1'
                type={"text"}
                name = {"commission"}
                value = {commission}
                placeholder = {`${currency.symbol}00.00`}
                onChange = {updateCommission}
            />
        </div>
    </div> 
    )
}
export default Commission