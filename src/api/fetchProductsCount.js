import axios from 'axios'
import { rootUrl } from './rootUrl'
const fetchProductsCount = (state, status) => {
    axios({
        url : 'product/product-count', 
        baseURL : rootUrl(),
        method : 'get'

    }). 
    then(response => {
        const { success } = response.data
        if(success){
            state(prev => response.data.data)
            status(prev => ({...prev, productCount : false}))
        }
    }).
    catch(err => console.log(err))
    
}
export { fetchProductsCount }
