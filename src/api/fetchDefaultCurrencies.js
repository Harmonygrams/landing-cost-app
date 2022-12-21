import axios from 'axios'
import { rootUrl } from './rootUrl'
const fetchDefaultCurrencies = (getFetchedData) => {
    axios({
        url : 'settings/fetch-default-currencies',
        method : 'get', 
        baseURL : rootUrl(),
    }).
    then(response => {
        if(response.data.success){
            const {data} = response.data
            getFetchedData(data)
        }
    }). 
    catch(err => console.log(err))
}
export {fetchDefaultCurrencies}