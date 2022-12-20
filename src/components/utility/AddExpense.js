import { useEffect, useState } from 'react'
import { addExpense } from '../../api/addExpense'
import { GrClose} from 'react-icons/gr'
import { ScaleLoader } from 'react-spinners'
import expensesTypes from '../../config/expensesTypes'
const AddExpense = ({closeWindow}) => {
    const [enableSearchOptions, setEnableSearchOptions] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false) 
    const [formData, setFormData] = useState({
        name : "", 
        type : "", 
        description : ""
    })
    const updateFormData  = (e) => {
        setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
    }
    const filterOptions = (e) => {
        setEnableSearchOptions(true)
    }
    useEffect(() => {
        //disable expense type options when any part of window clicked
        const disableSearchOptions = (e) => {
            if(e.target.classList.contains('expense__type')){
                setEnableSearchOptions(prev => !prev)
                return 
            }
            setEnableSearchOptions(false)
        }
        document.addEventListener('click', disableSearchOptions)
        return () => document.removeEventListener('click', disableSearchOptions)
    })
    const resetFormData = () => {
        setFormData({
            name : "", 
            type : "", 
            description : ""            
        })
    }
    const submitFormData = (e) => {
        e.preventDefault() 
        setIsProcessing(true)
        const newFormData = new FormData()
        newFormData.set('name', formData.name)
        newFormData.set('type', formData.type)
        newFormData.set('description', formData.description)
        addExpense(newFormData, setIsProcessing, resetFormData)
    }
    return(
        <div className="add-expense__container absolute top-0 w-full h-screen left-0 md:flex md:justify-end">
        <form className='bg-white px-4 relative h-screen md:w-96' onSubmit={submitFormData}> 
            <div className='flex items-center justify-between pt-8 font-semibold'>
                <h1 className='text-xl'> Add Expense </h1>
                <div 
                    className='hover:bg-gray-200 inline-block p-2 rounded-lg cursor-pointer'
                    onClick={() => closeWindow()}
                    >
                    <GrClose 
                        className='text-lg font-bold'
                    />
                </div>
            </div>
            <div className='flex flex-col mt-4'> 
                <label 
                    htmlFor='name'
                    className='text-lg mb-2 text-gray-700'
                    >Name</label>
                <input 
                    name = {"name"}
                    className = "border-2 border-gray-300 rounded-lg px-4 py-2 outline-black text-gray-600"
                    placeholder='Expense name'
                    value = {formData.name}
                    onChange = {updateFormData}
                    required
                />
            </div>
            <div className='flex flex-col mt-4'> 
                <label 
                    htmlFor='type'
                    className='text-lg mb-2 text-gray-700'
                    >Type</label>
                <div 
                    className='relative expense__type'
                >
                    <input 
                        name = {"type"}
                        className = "border-2 border-gray-300 rounded-lg px-4 py-2 outline-black w-full expense__type text-gray-600"
                        placeholder='Expense name'
                        value = {formData.type}
                        onChange = {filterOptions}
                        required 
                    />
                    {enableSearchOptions && <div className='absolute w-full h-20 mt-1 bg-white border-2 shadow-lg overflow-y-scroll'> 
                        {expensesTypes.map(item => <p 
                            className='hover:bg-gray-200 px-2 py-2 text-sm text-gray-600 font-medium cursor-pointer'
                            onClick={() => setFormData(prev => ({...prev, type : item.label}))}
                            >{item.label
                        }</p>)}
                    </div>}
                </div>
            </div>
            <div className='flex flex-col mt-4 text-lg mb-2'> 
                <label 
                    className='text-lg mb-2 text-gray-700'
                    htmlFor='description'>Description</label>
                <textarea 
                    rows={3}
                    name = {"description"}
                    className="border-2 border-gray-300 rounded-lg px-4 py-2 outline-black text-gray-600"
                    value = {formData.description}
                    onChange={updateFormData}
                /> 
            </div>
            <div className='py-4 border-t-2 flex justify-center gap-2 absolute bottom-0 left-0 w-full md:justify-end px-4'>
                <button 
                    className='border-2 px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition hover:text-white border-gray-800'
                    onClick={() => closeWindow()}
                    >
                    Cancel
                    </button>
                <button className='border-2 px-4 py-2 text-sm rounded-lg bg-gray-800 text-white border-gray-800'
                style={{cursor : isProcessing ? 'wait' : 'pointer'}}
                disabled = {isProcessing && true}
                >{isProcessing ? 
                <span className='flex items-center gap-2'> 
                    Save
                    <ScaleLoader color = {"#fff"} width={2} height={15}/> 
                </span>
                    : 
                'Save'} 
                </button>
            </div>
        </form>
    </div>
    )
}
export default AddExpense

