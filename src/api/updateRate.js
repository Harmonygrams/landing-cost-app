import axios from 'axios'
import { rootUrl } from './rootUrl'
const updateRate = (payload) => {
    axios({
        url : 'settings/rate-update/',
        baseURL : rootUrl(),
        method : 'put',
        data : payload
    }). 
    then(response => console.log(response)). 
    catch(err => console.log(err))
}   
export {updateRate}