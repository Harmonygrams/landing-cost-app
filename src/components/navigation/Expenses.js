import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ScaleLoader } from "react-spinners"
import { fetchExpensesCount } from '../../api/fetchExpensesCount'
import ExpensesTable from "../tables/ExpensesTable"
import AddExpense from "../utility/AddExpense"
import { actions as sidebarActions} from '../../store/sidebarSlice/sidebarSlice'
const Expenses = () => {
    const [enableAddNewExpense, setEnableAddNewExpense] = useState(false)
    const [expenseCount, setExpenseCount] = useState(null)
    const [isLoadingExpenseCount , setIsLoadingExpenseCount] = useState({
        expenseCount : true
    })
    const dispatch = useDispatch()
    useEffect(() => {
        fetchExpensesCount(setExpenseCount, setIsLoadingExpenseCount)
        document.title = "Expenses"
        dispatch(sidebarActions.setCurrentPage('expenses'))
    }, [])
    useEffect(() => {
    }, [expenseCount])
    return(
        <div className = ""> 
            <div className="flex flex-col gap-4 mb-8 md:flex-row mt-4"> 
                <div className="w-full  bg-white py-2 px-6 rounded-lg hover:shadow-lg transition cursor-pointer border-l-8 border-yellow-500">
                    <p className="text-gray-600 text-sm mt-2">All Expenses</p>
                    <h2 className="text-2xl md:text-4xl mt-2">
                        {isLoadingExpenseCount.expenseCount ? 
                            <ScaleLoader
                                width={2} 
                                height={18}
                            /> : `${expenseCount}`
                        }
                    </h2>
                </div>
                <div className="w-full bg-white py-2 px-6 rounded-lg hover:shadow-lg transition cursor-pointer border-r-8 border-purple-500">
                    <p className="text-gray-600 text-sm mt-2">Total Cost</p>
                    <h2 className="text-2xl md:text-4xl mt-2">
                        {
                            <ScaleLoader
                                width={2} 
                                height={18}
                            />
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
                    onClick = {() => setEnableAddNewExpense(true)}
                > New expense</button>
            </div>
            <ExpensesTable />
            {enableAddNewExpense && <AddExpense closeWindow={() => setEnableAddNewExpense(false)}/>}
        </div>
    )
}
export default Expenses