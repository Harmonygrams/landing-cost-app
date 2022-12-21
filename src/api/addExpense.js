import axios from 'axios'
const addExpense = (formData, setIsProcessing, resetFormData) => {
    axios({
        url : 'https://server.landing-cost.chibuike.net/expense/add-expense', 
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