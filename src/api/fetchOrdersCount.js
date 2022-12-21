import axios from 'axios'
import { rootUrl } from './rootUrl'
const fetchOrdersCount = (state, status) => {
    axios({
        url : 'order/order-count',
        baseURL : rootUrl(),
        method : 'get'
    }).
    then(response => {
        const {success} = response.data
        if(success){
            state(response.data.data)
            status(prev => ({...prev, orderCount : false}))
        }
    }). 
    catch(err => console.log(err))
}
export { fetchOrdersCount }