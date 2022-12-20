import {GrClose} from 'react-icons/gr'
import { useState, useRef} from 'react'
import { addProduct } from '../../api/addProduct'
import { ScaleLoader } from 'react-spinners'
const AddProduct = ({closeWindow}) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [formData, setFormData] = useState({
        name : '', 
        description : '',
        duty : '', 
        vat : ''
    })
    const updateFormData = (e) => {
        setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
    }
    const submitFormData = (e) => {
        setIsProcessing(true)
        e.preventDefault()
        const newFormData = new FormData()
        newFormData.set('name', formData.name)
        newFormData.set('description', formData.description)
        newFormData.set('duty', formData.duty)
        newFormData.set('vat', formData.vat)
        addProduct(newFormData, setIsProcessing, resetFormData)   
    }
    const resetFormData = () => {
        setFormData({
            name : '', 
            description : '',
            duty : '',
            vat : ''
        })
    }
    return(
        <div className="add-product__container absolute top-0 w-full h-screen left-0 md:flex md:justify-end">
            <form className='bg-white px-4 relative h-screen md:w-96' onSubmit={submitFormData}> 
                <div className='flex items-center justify-between pt-8 font-semibold'>
                    <h1 className='text-xl'> Add Product </h1>
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
                        className = "border-2 border-gray-300 rounded-lg px-4 py-2 outline-black"
                        placeholder='Product name'
                        value = {formData.name}
                        onChange = {updateFormData}
                        readOnly = {isProcessing && true}
                        required
                    />
                </div>
                <div className='flex flex-col mt-4 text-lg mb-2'> 
                    <label 
                        className='text-lg mb-2 text-gray-700'
                        htmlFor='description'>Description</label>

                    <textarea 
                        rows={3}
                        name = {"description"}
                        className="border-2 border-gray-300 rounded-lg px-4 py-2 outline-black"
                        value = {formData.description}
                        onChange = {updateFormData}
                        readOnly = {isProcessing && true}
                    /> 
                </div>
                <fieldset className='border-2 text-center rounded-lg text-lg mb-2 text-gray-700 py-4 px-4'> 
                    <legend className='px-2'> Charges </legend>
                    <div className='flex gap-4'> 
                        <input 
                            className='border-2 border-gray-300 rounded-lg px-4 py-2 outline-black w-[50%]'
                            name = {'duty'}
                            placeholder = {"duty %"}
                            value = {formData.duty}
                            onChange = {updateFormData}
                            
                            />
                        <input 
                            className='border-2 border-gray-300 rounded-lg px-4 py-2 outline-black w-[50%]'
                            name = {"vat"}
                            placeholder = {"vat %"}
                            value = {formData.vat}
                            onChange = {updateFormData}
                        />
                    </div>
                </fieldset>
                <div className='py-4 border-t-2 flex justify-center gap-2 absolute bottom-0 left-0 w-full md:justify-end px-4'> 
                    <button 
                        className='border-2 px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition hover:text-white border-gray-800'
                        onClick={() => closeWindow()}
                        >
                        Cancel
                        </button>
                    <button 
                        className='border-2 px-4 py-2 text-sm rounded-lg bg-gray-800 text-white border-gray-800'
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
export default AddProduct