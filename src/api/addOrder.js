import axios from 'axios'
const addOrder = (order) => {
    axios({
        url : "http://localhost:5001/order/add-order", 
        method : "post", 
        data : order
    }).
    then(response => console.log(response)). 
    catch(err => console.log(err))
}
export { addOrder }