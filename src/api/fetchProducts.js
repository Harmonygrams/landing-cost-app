import axios from "axios"
const fetchProducts = (setProductTableData, query) => {
    const raw = {}
    raw.query = query
    axios({
        url : "https://server.landing-cost.chibuike.net/product/fetch",
        method : 'POST', 
        data : raw,
    }).then(response => response.data).
    then(data =>  setProductTableData(prev => ({...prev, data : data.data}))).
    catch(err => console.log(err))
}
export {fetchProducts}