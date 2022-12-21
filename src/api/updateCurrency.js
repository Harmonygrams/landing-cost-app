import axios from 'axios'
import { rootUrl } from './rootUrl'
const updateCurrency = (payload, status) => {
    return(
        axios({
            url : 'settings/currency-update/', 
            baseURL : rootUrl(),
            method : 'put',
            data : payload
        }).
        then(response => {
            if(response.data.success){
                status(false)
            }}). 
        catch(err => {
            status(false)
            console.log('Error sending request')
        })
    )
}
export default updateCurrency