import axios from 'axios'
import { rootUrl } from './rootUrl'
const fetchRate = (state) => {
    axios({
        url : 'settings/fetch-rate/',
        baseURL : rootUrl(),
        method : 'get', 
    }). 
    then(response => {
        const {success, data} = response.data
        if(success){
            state({
                rate : data.rate,
                primaryCurrency : {
                    name : data.primaryCurrency.name, 
                    code : data.primaryCurrency.code,
                    symbol : data.primaryCurrency.symbol ? data.primaryCurrency.symbol : data.primaryCurrency.code
                }, 
                secondaryCurrency : {
                    name : data.secondaryCurrency.name, 
                    code : data.secondaryCurrency.code, 
                    symbol : data.secondaryCurrency.symbol ? data.secondaryCurrency.symbol : data.secondaryCurrency.code
                }
            
            })
        }
    }). 
    catch(err => console.log(err))
}
export {fetchRate}