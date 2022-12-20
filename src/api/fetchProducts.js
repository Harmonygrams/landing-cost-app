import axios from "axios"
const fetchProducts = (setProductTableData, query) => {
    const raw = {}
    raw.query = query
    axios({
        url : "http://localhost:5001/product/fetch",
        method : 'POST', 
        data : raw,
    }).then(response => response.data).
    then(data =>  setProductTableData(prev => ({...prev, data : data.data}))).
    catch(err => console.log(err))
}
export {fetchProducts}