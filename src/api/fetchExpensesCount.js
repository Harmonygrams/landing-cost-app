import axios from 'axios'
import { rootUrl } from './rootUrl'
const fetchExpensesCount = (state, status) => {
    axios({
        url : 'expense/expense-count',
        baseURL : rootUrl(),
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