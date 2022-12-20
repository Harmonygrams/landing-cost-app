import { configureStore } from '@reduxjs/toolkit'
import { sidebarReducer } from './sidebarSlice/sidebarSlice'
import { expenseSliceReducer } from './expenseSlice/expenseSlice'
import { settingReducer } from './settingSlice/settingSlice'
const store = configureStore({
    reducer : {
        sidebar : sidebarReducer, 
        expense : expenseSliceReducer,
        setting : settingReducer,
    }
})
export default store