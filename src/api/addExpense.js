import axios from 'axios'
const addExpense = (formData, setIsProcessing, resetFormData) => {
    axios({
        url : 'http://localhost:5001/expense/add', 
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