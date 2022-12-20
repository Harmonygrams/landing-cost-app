import { createSlice } from '@reduxjs/toolkit' 
const settingSlice = createSlice({
    name : 'setting', 
    initialState : {
        currency : {
            primaryCurrency : {
                name : '', 
                code : '',
                symbol : '',
            },
            secondaryCurrency : {
                name : '', 
                code : '',
                symbol : '',
            }, 
            rate : ''
        }
    }, 
    reducers : {
        setPrimaryCurrency : (state, action) => {
            state.currency.primaryCurrency.name = action.payload.name 
            state.currency.primaryCurrency.code = action.payload.code 
            state.currency.primaryCurrency.symbol = action.payload.symbol
        }, 
        setSecondaryCurrency : (state, action) => {
            state.currency.secondaryCurrency.name = action.payload.name 
            state.currency.secondaryCurrency.code = action.payload.code 
            state.currency.secondaryCurrency.symbol = action.payload.symbol
        }, 
        setRateOfCurrency : (state, actions) =>  {
            state.currency.rate = actions.payload.rate
        }, 
    }
})
const settingReducer = settingSlice.reducer 
const actions = settingSlice.actions
export {settingReducer, actions}