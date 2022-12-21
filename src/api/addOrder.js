import axios from 'axios'
const addOrder = (order) => {
    axios({
        url : "https://server.landing-cost.chibuike.net/order/add-order", 
        method : "post", 
        data : order
    }).
    then(response => console.log(response)). 
    catch(err => console.log(err))
}
export { addOrder }