import { rootUrl } from "./rootUrl"
import axios from 'axios'
const fetchLandingAmountTotal = (state, status, query) => {
    axios({
        url : 'order/fetch-landing-amount-total', 
        baseURL : rootUrl(),
        method : 'post', 
        data : query,
    }). 
    then(response => {
        const { success } = response.data
        if(success){
            state(response.data.data[0].total)
        }
    }). 
    then(() => status(prev => ({...prev, landingAmountTotal : false}))). 
    catch(err => {
        status(prev => ({...prev, landingAmountTotal : false}))
        console.log(err)
    })
}
export { fetchLandingAmountTotal }