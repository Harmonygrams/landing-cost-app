import { createSlice, current } from "@reduxjs/toolkit"
const expenseSlice = createSlice({
    name : "expense", 
    initialState : {
        optionalExpenses : [],
        subtotal : Number(0),
        total : Number(0),
        subtotalExpensesArray : [],
        totalExpensesArray : [],
        commission : Number(0),
    }, 
    reducers : {
        setCommission : (state, action) => {
            state.commission = action.payload.commission
        },
        selectedAdditionalExpense : (state, action) => {
            const newExpense = action.payload
            state.optionalExpenses = [...state.optionalExpenses, newExpense]

        }, 
        removeAddionalExpense : (state, action) => {
            state.optionalExpenses = state.optionalExpenses.filter(expense => expense.id !== action.payload.id)
        },
        addSubtotal : (state, action) => {
            const newItem = action.payload
            if(state.subtotalExpensesArray.length === 0){
                state.subtotalExpensesArray = [newItem]
            }else if(state.subtotalExpensesArray.length > 0){
                //checking if the current item is in the array 
                const newArray = state.subtotalExpensesArray.map(expense => expense.id)
                if(!newArray.includes(newItem.id)){
                    state.subtotalExpensesArray = [...state.subtotalExpensesArray, newItem]
                }
                //check if in array but value has changed 
                if(newArray.includes(newItem.id)){
                    const itemToModify = state.subtotalExpensesArray.find(expense => expense.id === newItem.id)
                    itemToModify.value = newItem.value
                }
            }
            let subtotal = 0
            state.subtotalExpensesArray.forEach(expense => {
                subtotal+= Number(expense.value)
                
            }, 0)
            state.subtotal = subtotal
        },
        reduceSubtotal : (state, action) => {
            const itemToBeRemoved = action.payload
            const expensesIds = state.subtotalExpensesArray.map(item => item.id)
            const itemToBeRemovedIsInExpensesArray = expensesIds.find(id => id === itemToBeRemoved.id)
            if(itemToBeRemovedIsInExpensesArray){
                // state.subtotalExpensesArray = state.subtotalExpensesArray.filter(expense => expense.id !== itemToBeRemoved.id)
            }
            let subtotal = 0
            state.subtotalExpensesArray.forEach(expense => {
                subtotal+= Number(expense.value)
                
            }, 0)
            state.subtotal = subtotal
        },
        removeItemFromTotalExpenseArray : (state, action) => {
            const itemToBeRemoved = action.payload
            state.totalExpensesArray = state.totalExpensesArray.filter(expense => expense.rowId !== itemToBeRemoved.rowId)
            let total = 0 
            state.totalExpensesArray.forEach(expense => {
                total += Number(expense.amount)
            })
            state.total = total
        }, 
        addTotal : (state, action) => {
            const newItem = action.payload
            // if the array is empty 
            if(state.totalExpensesArray.length  === 0){
                state.totalExpensesArray = [newItem]
            }
            else if(state.totalExpensesArray.length > 0){
                //checking if the current item is in array 
                const newArray = state.totalExpensesArray.map(expense => expense.rowId)
                if(!newArray.includes(newItem.rowId)){
                    state.totalExpensesArray = [...state.totalExpensesArray, newItem]
                }
                //check if in array but value has changed 
                if(newArray.includes(newItem.rowId)){
                    const itemToModify = state.totalExpensesArray.find(expense => expense.rowId === newItem.rowId)
                    itemToModify.date = newItem.date
                    itemToModify.item = newItem.item 
                    itemToModify.description = newItem.description 
                    itemToModify.quantity = Number(newItem.quantity)
                    itemToModify.rate = Math.round(newItem.rate * 100) / 100
                    itemToModify.amount = Math.round(newItem.amount * 100) / 100
                    itemToModify.vat = Number(newItem.vat) 
                    itemToModify.duty = Number(newItem.duty)
                }
            }
            let total = 0 
            state.totalExpensesArray.forEach(expense => {
                total += Number(expense.amount)
            })
            state.total = total
        }, 
        resetSubtotal : (state) => {
            state.subtotal = 0
        },
        resetExpenses : (state) => {
            state.subtotal = 0
            state.total = 0 
            state.subtotalExpensesArray = []
            state.totalExpensesArray = []
            state.optionalExpenses = []
            state.commission = 0
        }   
    }
})
const actions = expenseSlice.actions
const expenseSliceReducer = expenseSlice.reducer

export {actions, expenseSliceReducer}