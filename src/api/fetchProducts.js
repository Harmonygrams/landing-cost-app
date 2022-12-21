import axios from "axios"
import { rootUrl } from "./rootUrl"
const fetchProducts = (setProductTableData, query) => {
    const raw = {}
    raw.query = query
    axios({
        url : "product/fetch",
        baseURL : rootUrl(),
        method : 'POST', 
        data : raw,
    }).then(response => response.data).
    then(data =>  setProductTableData(prev => ({...prev, data : data.data}))).
    catch(err => console.log(err))
}
export {fetchProducts}