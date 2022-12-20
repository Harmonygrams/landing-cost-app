import { useEffect, useState } from 'react'
import {BiLockAlt, BiLockOpenAlt} from 'react-icons/bi'
import { fetchRate } from '../../api/fetchRate'
import { updateRate } from '../../api/updateRate'
import { useDispatch } from 'react-redux'
import { actions as settingsActions} from '../../store/settingSlice/settingSlice'
const RateCalculator = () => {
    const dispatch = useDispatch()
    const [isRateReadOnly, setIsRateReadOnly] = useState(true)
    const [rate, setRate] = useState({
        rate : '',
        primaryCurrency : {
            name : '', 
            code : '',
        }, 
        secondaryCurrency : {
            name : '', 
            code : ''
        }
    })
    useEffect(() => {
        const addFocus = (e) => {
            if(e.target.classList.contains('rate__input__tag')){
                const parentElement = e.target.parentElement
                parentElement.style.border = "2px solid rgba(0,0,0,.6)"
            }
        }
        const removeFocus = (e) => {
            if(e.target.classList.contains('rate__input__tag')){
                const parentElement = e.target.parentElement
                parentElement.style.border = "2px solid #e5e7eb"
            }
        }
        document.addEventListener('focusin', addFocus) 
        document.addEventListener('focusout', removeFocus) 
        return () => {
            document.removeEventListener('focus', addFocus)
            document.removeEventListener('focusout', removeFocus)
        }
    }, [])
    useEffect(() => {
        fetchRate(setRate)
    }, [])
    useEffect(() => {
        dispatch(settingsActions.setRateOfCurrency({rate : rate.rate}))
    }, [rate])
    return(
        <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center border-2 px-4 py-2 gap-4 rounded-lg items-center text-gray-600">
                <h3>{rate.secondaryCurrency.code}</h3>
                    <input
                        type="text"
                        placeholder="Rate"
                        name = {"rate"}
                        className="border-x-2 px-2 py-1 w-40 text-center rate__input__tag outline-none" 
                        value = {rate.rate}
                        readOnly = {isRateReadOnly}
                        onChange = {(e) => setRate(prev => ({...prev, [e.target.name] : e.target.value}))}
                    />
                <h3>{rate.primaryCurrency.code}</h3>
            </div>
            <div 
                className='px-4 py-2 cursor-pointer'
                onClick={() => {
                    setIsRateReadOnly(prev => {
                        if(!prev){
                            updateRate({rate : rate.rate})
                        }
                        return !prev
                    })
                }}
                > 
                {isRateReadOnly ? <BiLockAlt className='text-2xl text-gray-700' /> : <BiLockOpenAlt className='text-2xl text-gray-700'/>}
            </div>
        </div>
    )
}
export default RateCalculator