import axios from 'axios'
const fetchOrdersCount = (state, status) => {
    axios({
        url : 'http://server.landing-cost.chibuike.net/product/product-count',
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