import {GrClose} from 'react-icons/gr'
import { useState, useMemo, useEffect } from 'react'
import ExpenseCards from './ExpensesCards'
import AddOptionalExpenses from './AddOptionalExpenses'
import {AiOutlineEdit} from 'react-icons/ai'
import { useSelector} from "react-redux"
import AddOrderTable from '../tables/AddOrderTable'
import TableContent from '../../data/TableContent'
import { nanoid } from 'nanoid'
import {fetchExpenses} from '../../api/fetchExpenses'
import Subtotal from './Subtotal'
import Total from './Total'
import RateCalculator from './RateCalulator'
import LandingCost from './LandingCost'
import Commission from './Commission'
const AddOrder = ({closeWindow}) => {
    const additionalExpenses = useSelector(state => state.expense.optionalExpenses)
    const [landingCostPageIsEnabled, setLandingCostPageIsEnabled] = useState(false)
    const [enableOptionalExpenses, setEnableOptionalExpenses] = useState(false)
    const [expenses, setExpenses] = useState({
        data : []
    })
    const renderExpenses = useMemo(() => expenses.data, [expenses])
    useEffect(() => {
        fetchExpenses(setExpenses)
    }, [])
    return(
        <div className="add-product__container absolute top-0 w-full h-screen left-0 md:flex md:items-end">
            <form 
                className='bg-white px-4 relative h-screen w-full md:h-[96%] md:rounded-t-3xl overflow-y-scroll'
                onClick={(e) => e.preventDefault()}
            > 
                    <div className='flex items-center justify-between pt-8 font-semibold'>
                        <h1 className='text-xl'> New Order </h1>
                        <div 
                            className='hover:bg-gray-200 inline-block p-2 rounded-lg cursor-pointer'
                            onClick={() => closeWindow()}
                            >
                            <GrClose x
                                className='text-lg font-bold'
                            />
                        </div>
                    </div>
                    <RateCalculator /> 
                    <div className='mt-8'> 
                        <div className='flex items-center justify-between my-4'>
                            <p className='text-lg lg md:text-2xl text-gray-600 font-normal'>Expenses</p>
                            <div 
                                className='border-2 p-2 bg-black text-white cursor-pointer rounded-lg'
                                onClick={() => setEnableOptionalExpenses(true)}
                            > 
                                <AiOutlineEdit className='text-xl'/>
                            </div>
                        </div>
                        <div className='md:flex flex-wrap'>
                            {renderExpenses.map(expense => {
                                if(expense.type === "Mandatory"){
                                    return(<ExpenseCards name = {expense.name} isMandatory={expense.type === 'Mandatory'} key = {nanoid()} id={expense._id}/>)
                                }
                            })
                            }
                            {
                                additionalExpenses.map(expense => {
                                    return(<ExpenseCards name = {expense.name} isMandatory={expense.type === 'Optional'} key = {nanoid()} id={expense.id}/>)
                                })
                            }
                        </div>
                    </div>
                    <Subtotal />
                    <p 
                        className='text-lg lg md:text-2xl text-gray-600 font-normal mb-4'
                        htmlFor='text-xl text-gray-600 font-medium'>Items
                    </p>
                    <Commission />
                    <div className='flex flex-col mt-4 text-lg mb-2 h-full overflow-y-scroll'> 
                        <AddOrderTable 
                            headers={[
                                "",
                                "Item #",
                                "Items",
                                "Description",
                                "Qty",
                                "Rate",
                                "Amount", 
                                ""
                            ]}
                            minCellWidth = {120}
                            tableContent = {<TableContent />}
                        />
                    </div>
                <div className='py-4 border-t-2 flex justify-center gap-2 sticky bottom-0 left-0 w-full md:justify-end px-4 flex-col bg-white'> 
                    <Total />
                    <div className='flex justify-end gap-2 md:gap-4'> 
                        <button 
                            className='border-2 px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition hover:text-white border-gray-800'
                            onClick={() => closeWindow()}
                            >
                            Cancel
                            </button>
                        <button 
                            className='border-2 px-4 py-2 text-sm rounded-lg bg-black text-white hover:text-gray-800 hover:bg-white border-gray-800'
                            onClick={() => setLandingCostPageIsEnabled(true)}
                        >View Landing Cost</button>
                    </div>
                </div>
            </form>

            {/* These pages are rendered when a particular conditions are met  */}
            {
                enableOptionalExpenses && <AddOptionalExpenses closeWindow={() => {
                    setEnableOptionalExpenses(false) 
                }}/>
            }
            {
                landingCostPageIsEnabled && <LandingCost closeWindow = {() => setLandingCostPageIsEnabled(false)}/>
            }
        </div>
    )
}
export default AddOrder