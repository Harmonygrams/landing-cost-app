import { useEffect, useState } from "react"
import { GrClose } from "react-icons/gr"
import {fetchDefaultCurrencies} from "../../api/fetchDefaultCurrencies"
import countries from '../../data/countries.json'
import updateCurrency from "../../api/updateCurrency"
import { ScaleLoader } from "react-spinners"
const CurrencySelector = ({closeWindow}) => {
    const [defaultCurrencies, setDefaultCurrencies] = useState({})
    const [savedNewCurrencySetting, setSaveNewCurrencySetting] = useState(false) 
    const [enablePrimaryCurrencyDropdown, setEnablePrimaryCurrencyDropdown] = useState(false)
    const [enableSecondaryCurrencyDropdown, setEnableSecondaryCurrencyDropdown] = useState(false)    
    useEffect(() => {
        const disableCurrencyDropdown = (e) => {
            if(!e.target.classList.contains('currency_input')){
                setEnablePrimaryCurrencyDropdown(false)
                setEnableSecondaryCurrencyDropdown(false)
            }
        }
        document.addEventListener('click', disableCurrencyDropdown)
        return () => document.removeEventListener('click', disableCurrencyDropdown)
    }, [])

    const primaryCurrencySelector = (currency) => {
        defaultCurrencies.primaryCurrency.name = currency.name
        defaultCurrencies.primaryCurrency.code = currency.currency.code
        defaultCurrencies.primaryCurrency.symbol = currency.currency.symbol === "$" ? "\uFF04" : currency.currency.symbol
    }
    const secondaryCurrencySelector = (currency) => {
        defaultCurrencies.secondaryCurrency.name = currency.name 
        defaultCurrencies.secondaryCurrency.code = currency.currency.code
        defaultCurrencies.secondaryCurrency.symbol = currency.currency.symbol === "$" ? "\uFF04" : currency.currency.symbol
    }
    const saveSetting = () => {
        setSaveNewCurrencySetting(true)
        updateCurrency({
            primaryCurrency : { name : defaultCurrencies.primaryCurrency.name, code : defaultCurrencies.primaryCurrency.code, symbol : defaultCurrencies.primaryCurrency.symbol },
            secondaryCurrency : { name : defaultCurrencies.secondaryCurrency.name, code : defaultCurrencies.secondaryCurrency.code, symbol : defaultCurrencies.secondaryCurrency.symbol}
        }, setSaveNewCurrencySetting)
    }
    useEffect(() => {
        //updating default currencies from the database
        fetchDefaultCurrencies(setDefaultCurrencies)
    }, [])
    return(
        <div className="absolute h-screen w-full left-0 top-0 transparent__container flex items-end">
            <div className="w-full h-[96%] bg-white px-4 md:rounded-t-3xl">
                <div>
                    <div className="px"> 
                        <div className='flex items-center justify-between pt-8 font-semibold'>
                            <h1 className='text-xl'> Currency</h1>
                            <div 
                                className='hover:bg-gray-200 inline-block p-2 rounded-lg cursor-pointer'
                                onClick={() => closeWindow()}
                                >
                                <GrClose x
                                    className='text-lg font-bold'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-12 flex-row justify-center ">
                        <div> 
                            <h4 className="text-xl mb-4 text-gray-600"> Primary Currency </h4>
                            <div className="relative">
                                <input
                                    className="border-2 p-4 text-xl text-gray-600 outline-black rounded-lg w-full currency_input"
                                    onClick={() => setEnablePrimaryCurrencyDropdown(prev => !prev)}
                                    value = {defaultCurrencies.primaryCurrency ?  defaultCurrencies.primaryCurrency.name : 'loading...'
                                }

                                />
                                {enablePrimaryCurrencyDropdown && <div 
                                    className="border-2 absolute mt-1 shadow-lg dropdown__settings-container overflow-scroll"
                                > 
                                    { 
                                        countries.map(currency => (
                                            <div 
                                                className="flex justify-between items-center px-4 py-4 text-gray-600 hover:bg-gray-200"
                                                onClick={() => primaryCurrencySelector(currency)}
                                            > 
                                            <p>{currency.name}</p>
                                            <p>{currency.currency.code}</p>
                                            </div>))
                                    }
                                </div>}
                            </div>
                        </div>
                        <div className=""> 
                            <h4 className="text-xl mb-4 text-gray-600"> Secondary Currency </h4>
                            <div> 
                                <input
                                    className="border-2 p-4 text-xl text-gray-600 outline-black rounded-lg w-full currency_input"
                                    onClick={() => setEnableSecondaryCurrencyDropdown(prev => !prev)}
                                    value = {defaultCurrencies.secondaryCurrency ?  defaultCurrencies.secondaryCurrency.name : 'loading...'}
                                />
                                {enableSecondaryCurrencyDropdown && <div 
                                    className="border-2 absolute mt-1 shadow-lg dropdown__settings-container overflow-scroll"
                                > 
                                    { 
                                        countries.map(country => (
                                            <div 
                                                className="flex justify-between items-center px-4 py-4 text-gray-600 hover:bg-gray-200"
                                                onClick={() => secondaryCurrencySelector(country)}
                                            > 
                                            <p>{country.name}</p>
                                            <p>{country.currency.code}</p>
                                            </div>))
                                    }
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute w-full border-t-2 bottom-0 py-4 left-0 flex justify-end px-4"> 
                    <button 
                        className="bg-black text-white border-2 border-black transition px-8 py-2 rounded-lg"
                        onClick = {saveSetting}
                    >{ savedNewCurrencySetting? 
                        <span className='flex items-center gap-2'> 
                            Save
                            <ScaleLoader color = {"#fff"} width={2} height={15}/> 
                        </span>
                            : 
                        'Save'} </button>
                </div>
            </div>
        </div>
    )   
}
export default CurrencySelector