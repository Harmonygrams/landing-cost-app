import axios from 'axios'
const addProduct = (formData, setIsProcessing,  resetFormData) => {
    axios({
        url : 'http://localhost:5001/product/add',
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
export {addProduct}