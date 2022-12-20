import axios from 'axios'
const fetchOrdersCount = (state, status) => {
    axios({
        url : 'http://localhost:5001/order/order-count',
        method : ''
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