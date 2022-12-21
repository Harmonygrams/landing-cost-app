import axios from 'axios'
import { rootUrl } from './rootUrl'
const fetchOrders = (state, status, query) => {
    axios({
        url : 'order/fetch-orders', 
        baseURL : rootUrl(),
        method : 'post', 
        data : query
    }).then(response => {
        const { success } = response.data
        if(success){
            state(response.data.data)
        }
    }).
    then(() => {
        status(prev => ({...prev, orders : false}))
    }).
    catch(err => console.log(err))
}
export { fetchOrders }