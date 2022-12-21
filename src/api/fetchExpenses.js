import axios from 'axios'
import { rootUrl } from './rootUrl'
const fetchExpenses = (setExpenses, query) => {
    axios({
        url : 'expense/fetch', 
        baseURL : rootUrl(),
        method : 'post',
        data : '', 

    }). 
    then(response => response.data).
    then(data => {
        if(data.success){
            setExpenses(prev => ({...prev, data : data.data}))
        }
    }).
    catch(err => console.log(err))
}
export { fetchExpenses }