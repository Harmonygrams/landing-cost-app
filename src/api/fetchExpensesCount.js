import axios from 'axios'
const fetchExpensesCount = (state, status) => {
    axios({
        url : 'http://localhost:5001/expense/expense-count',
        method : 'get'
    }). 
    then(response => {
        const { success } = response.data
        if(success){
            state(response.data.data)
            status(prev => ({...prev, expenseCount : false}))
        }
    }). 
    catch(err => console.log(err))
}
export { fetchExpensesCount }