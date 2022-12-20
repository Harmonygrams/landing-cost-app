import { GrClose } from "react-icons/gr"
import { useState, useMemo, useEffect } from 'react'
import OptionalExpensesCards from "./OptionalExpensesCards"
import { fetchExpenses } from "../../api/fetchExpenses"
const AddOptionalExpenses = ({closeWindow}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [expenses, setExpenses] = useState({
        data : []
    })
    const renderExpenses = useMemo(() => expenses, [expenses])
    useEffect(() => {
        fetchExpenses(setExpenses)
    }, [])
    return(
        <div className="optional__expenses-container absolute top-0 left-0 w-full h-full flex items-center">
            <div className="bg-white w-full h-full md:w-96 mx-auto md:h-[50%] rounded-lg overflow-hidden">
                <div className="flex justify-between pl-4 pr-2 py-2 border-2 items-center"> 
                    <h1>Edit</h1>
                    <div 
                        className='hover:bg-gray-200 inline-block p-2 rounded-lg cursor-pointer'
                        onClick={() => closeWindow()}
                        >
                        <GrClose 
                            className='text-lg font-bold'
                        />
                    </div>
                </div>
                <div className="">
                    {renderExpenses.data.map(expense => {
                        if(expense.type === "Optional"){
                            return(<OptionalExpensesCards 
                                name={expense.name} 
                                key={expense._id} 
                                id = {expense._id}
                                handleClick={() => setIsSelected(true)} 
                                selected={isSelected}/>)
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
export default AddOptionalExpenses