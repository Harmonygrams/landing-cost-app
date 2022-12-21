import axios from 'axios'
const fetchExpensesCount = (state, status) => {
    axios({
        url : 'https://server.landing-cost.chibuike.net/expense/expense-count',
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