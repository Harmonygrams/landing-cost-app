import axios from 'axios'
const fetchDefaultCurrencies = (getFetchedData) => {
    axios({
        method : 'get', 
        url : 'https://server.landing-cost.chibuike.net/settings/fetch-default-currencies'
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