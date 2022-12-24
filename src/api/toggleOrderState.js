import axios from 'axios'
import { rootUrl } from './rootUrl'
const toggleOrderState = (state, status, query) => {
    const raw = {
        id : query
    }
    axios({
        url : 'order/update-order',
        baseURL : rootUrl(), 
        method : 'put',
        data : raw,
    }).
    then(response => {
        const success = response.data.data
        if(success){
            status(prev => ({...prev, loadingMakeInactive : false}))
        }
    }). 
    catch(err => {
        status(false)
        status(prev => ({...prev, loadingMakeInactive : false}))
    })

}
export { toggleOrderState }