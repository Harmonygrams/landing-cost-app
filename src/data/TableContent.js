import React, { useEffect, useMemo, useState } from "react";
import RowData from "./RowData";
import { nanoid } from "nanoid";
import {GrAdd} from 'react-icons/gr'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from "@mui/x-date-pickers";
import { fetchProducts } from "../api/fetchProducts";
import { useDispatch } from "react-redux";
import { actions as expensesActions } from '../store/expenseSlice/expenseSlice'
const TableContent = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(new Date().getTime())
  const [formData, setFormData] = useState({
    date : value,
    item : '', 
    description : '',
    quantity : 1, 
    rate : '', 
    amount : '', 
    vat : '',
    duty : '',
  })
  const [itemsDropdownActive, setItemsDropdownActive] = useState(false)
  const [productsList, setProductsList] = useState({
    data : []
  })
  const fetchedProducts = useMemo(() => productsList.data, [productsList])
  const [numberOfItems, setItemNumber] = useState(0)
  const [tableData, setTableDatas] = useState([])
  const addRow = () => {
    const componentId = nanoid()
    setItemNumber(prev => prev + 1)
    setTableDatas(prev => ([...prev,
      {
        id : componentId,
        jsx : (<RowData remove={removeRow} add = {addRow} key={nanoid()} id={componentId} itemNumber={numberOfItems} />)
      }
    ]))
  }
  const removeRow = (id) => {
    // check the array and return the ones not equal to the clicked id
    setTableDatas(prev => prev.filter(data => data.id !== id))
    //reduce the amount 
    dispatch(expensesActions.removeItemFromTotalExpenseArray({
      rowId : id
    }))
  }

  //updates the formdata properties
  const updateFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
  }
  //updating the rate
  useEffect(() => {
    setItemNumber(tableData.length)
  }, [tableData])
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
            setFormData(prev => ({...prev, amount : Math.round((formData.quantity * formData.rate) * 100) / 100 }))
          }
        }else if(e.target.classList.contains('amount__input')){
          if(formData.amount){
            setFormData(prev => ({...prev, rate : Math.round((formData.amount / formData.quantity) * 100) / 100}))
          }
        }
      }
      }
    document.addEventListener('focusout', calculateRate) 
    return () => document.removeEventListener('focusout', calculateRate)
  })
  useEffect(() => {
    dispatch(expensesActions.addTotal({
      itemId : 1, 
      ...formData,
    }))
  }, [formData])
  return (
    <tbody>
      <tr className="cursor-pointer overflow-x-scroll">
        <td className="bg-white">
        <div 
            className='hover:bg-gray-200 inline-block p-2 rounded-lg cursor-pointer'
            onClick={addRow}
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
                  setItemsDropdownActive(true)
                  setFormData(prev => ({...prev, item : e.target.value}))        
                }}
            />{
              itemsDropdownActive && 
              <div className="bg-white dropdown__item-container mt-1 shadow-lg overflow-y-scroll scroll-smooth">
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
        />
        </td>
        <td className="bg-white">
        </td>
      </tr>
      {tableData.map(data => data.jsx)}
    </tbody>
  );
};

export default TableContent;
