import axios from 'axios'
import { rootUrl } from './rootUrl'
const addExpense = (formData, setIsProcessing, resetFormData) => {
    axios({
        url : 'expense/add',
        baseURL : rootUrl(),
        method : 'post', 
        data : formData
    }).
    then(response => response.data). 
    then(data => {
        if(data.success){
            resetFormData() 
            setIsProcessing(false)
        }
    }).
    catch(err => {
        setIsProcessing(false)
        console.log(err)
    })
}
export {addExpense}