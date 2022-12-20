import { GrAdd } from "react-icons/gr"
import {IoTrashBinOutline} from 'react-icons/io5'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, useMemo, useEffect} from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { fetchProducts } from "../api/fetchProducts";
import { useDispatch } from "react-redux";
import { actions as expenseActions } from '../store/expenseSlice/expenseSlice'
const RowData = ({remove, add, id}) => {
    const [value, setValue] = useState(new Date().getTime())
    const dispatch = useDispatch()
    const [itemsDropdownActive, setItemsDropdownActive] = useState(false)
    const [formData, setFormData] = useState({
        date : new Date().getTime(),
        item : '', 
        description : '',
        quantity : 1, 
        rate : '', 
        amount : '', 
        vat : '', 
        duty : '',
    })
    const [productsList, setProductsList] = useState({
        data : []
      })
    const fetchedProducts = useMemo(() => productsList.data, [productsList])
    //updates the formdata properties
    const updateFormData = (e) => {
        setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
    }
    useEffect(() => {
        fetchProducts(setProductsList, formData.item)
      }, [formData.item])    
    //effects when the dropdown options are clicked
    useEffect(() => {
        const disableDropdownActive = (e) => {
        if(!e.target.classList.contains('items__input')){
            setItemsDropdownActive(false)
        }
        }
        document.addEventListener('click', disableDropdownActive)
        return () => document.removeEventListener('click', disableDropdownActive)
    })
    useEffect(() => {
        const calculateRate = (e) => {
            if(formData.item){
                //For the quantity
                if(e.target.classList.contains('quantity__input')){
                  if(formData.rate){
                    setFormData(prev => ({...prev, amount : Math.round((formData.quantity * formData.rate) * 100) / 100}))
                  }
                }
                //for the rate 
                else if(e.target.classList.contains('rate__input')){
                  if(formData.rate){
                    setFormData(prev => ({...prev, amount : Math.round((formData.quantity * formData.rate) * 100)/ 100}))
                  }
                }
                //for the amount
                else if(e.target.classList.contains('amount__input')){
                  if(formData.amount){
                    setFormData(prev => ({...prev, rate : Math.round((formData.amount / formData.quantity) * 100) / 100}))
      
                  }
                }
            }
        }
        document.addEventListener('focusout', calculateRate) 
        return () => document.removeEventListener('focusout', calculateRate)
    })
    //Updates total when the quantity, rate or amount changes
    useEffect(() => {
        dispatch(expenseActions.addTotal({
            rowId : id, 
            ...formData,
        }))
    }, [formData])
    return(
    <tr className="cursor-pointer overflow-scroll">
            <td className="bg-white">
                <div 
                    className={`hover:bg-gray-200 inline-block p-2 rounded-lg cursor-pointer`}
                    onClick={add}
                    >
                    <GrAdd
                        className='text-lg font-bold'
                    />
                </div>
            </td>
            <td className="bg-white">
                <LocalizationProvider dateAdapter={AdapterDateFns}> 
                    <DatePicker
                        openTo="day"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue.getTime());
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </td>
            <td className="bg-white">
                <div className="relative"> 
                    <input 
                        type={"text"}
                        className=" px-2 w-full py-1 px-2 text-gray-600 items__input"
                        onClick={() => (setItemsDropdownActive(prev => !prev))}
                        name = {"item"}
                        value = {formData.item}
                        onChange = {(e) => {
                            setFormData(prev => ({...prev, item : e.target.value}))
                            setItemsDropdownActive(true)
                        }}
                    />{
                    itemsDropdownActive && 
                    <div className="dropdown__item-container bg-white mt-1 shadow-lg overflow-y-scroll scroll-smooth z-20">
                        {
                        fetchedProducts.map(product => {
                            return(
                            <p className="hover:bg-gray-200 px-2 py-6 text-gray-800 text-sm font-medium"
                                onClick={() => setFormData(prev => ({...prev, item : product.name, description : product.description, vat : product.vat, duty : product.duty}))}
                            >{product.name}</p>
                            )
                        })
                        }
                    </div>
                    }
                </div>
            </td>
            <td className="bg-white">
                <input 
                    className="px-2 w-full py-1 px-2 text-gray-600"
                    name = {"description"}
                    value = {formData.description}
                    onChange = {updateFormData}
                    required
                />
            </td>
            <td className="bg-white">
                <input 
                    className=" px-2 w-full py-1 px-2 text-gray-600 text-right quantity__input"
                    placeholder="0"
                    name = {"quantity"}
                    type={"text"}
                    value = {formData.quantity}
                    onChange = {updateFormData}
                    required
                />
            </td>
            <td className="bg-white">
                <input 
                    className="px-2 w-full py-1 px-2 text-gray-600 text-right rate__input"
                    placeholder="0.00"
                    name = {"rate"}
                    type={"text"}
                    value = {formData.rate}
                    onChange = {updateFormData}
                    required
                />
            </td>
            <td className="bg-white">
                <input 
                    className="px-2 w-full py-1 px-2 text-gray-600 text-right amount__input"
                    placeholder="0.00"
                    name = {"amount"}
                    type = {"text"}
                    value = {formData.amount}
                    onChange = {updateFormData}
                    required
                />
            </td>
            <td> 
                <div
                    className={`hover:bg-gray-200 inline-block p-2 rounded-lg cursor-pointer ${id}`}
                    onClick={() => remove(id)}
                > 
                    <IoTrashBinOutline />
                </div>
            </td>
        </tr>)
}
export default RowData