import {BiRadioCircle, BiRadioCircleMarked} from 'react-icons/bi'
import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as expensesActions} from '../../store/expenseSlice/expenseSlice'
const OptionalExpensesCards = ({name, id,}) => {
    const expenses = useSelector(state => state.expense.optionalExpenses)
    const [isSelected, setIsSelected] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        //searching if it's in the store 
        if((expenses.filter(expense => expense.id === id).length > 0)){
            setIsSelected(true)
        }
    }, [])
    useEffect(() => {
        if(isSelected){
            dispatch(expensesActions.selectedAdditionalExpense({
                name, 
                id
            }))
            return
        }
        dispatch(expensesActions.removeAddionalExpense({
            name, 
            id
        }))
    }, [isSelected])
    return(
        <div 
            className="border-y-2 px-4 py-2 flex justify-between items-center text-gray-600 cursor-pointer hover:bg-gray-300"
            onClick={() => setIsSelected(prev => {
                if(!prev){
                    window.localStorage.removeItem(id)
                    dispatch(expensesActions.reduceSubtotal({id : id}))
                }
                return !prev
            })}
        > 
            <p className="">{name}</p>
            {isSelected ? <BiRadioCircleMarked className='text-xl'/> : <BiRadioCircle className='text-xl'/> }
        </div>
    )
}
export default OptionalExpensesCards