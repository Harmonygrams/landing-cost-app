import axios from 'axios'
const fetchOrders = (state, status, query) => {
    axios({
        url : 'http://localhost:5001/order/fetch-orders', 
        method : 'post', 
        data : query
    }).then(response => {
        const { success } = response.data
        if(success){
            state(response.data.data)
        }
    }).
    then(() => {
        status(prev => ({...prev, orders : false}))
    }).
    catch(err => console.log(err))
}
export { fetchOrders }