import axios from 'axios'
const fetchProductsCount = (state, status) => {
    axios({
        url : 'https://server.landing-cost.chibuike.net/product/product-count', 
        method : 'get'
    }). 
    then(response => {
        const { success } = response.data
        if(success){
            state(prev => response.data.data)
            status(prev => ({...prev, productCount : false}))
        }
    }).
    catch(err => console.log(err))
    
}
export { fetchProductsCount }
