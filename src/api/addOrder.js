import axios from 'axios'
import { rootUrl } from './rootUrl'
const addOrder = (order) => {
    axios({
        url : "order/add-order", 
        method : "post", 
        baseURL : rootUrl(),
        data : order
    }).
    then(response => console.log(response)). 
    catch(err => console.log(err))
}
export { addOrder }