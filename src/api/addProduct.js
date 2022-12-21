import axios from 'axios'
const addProduct = (formData, setIsProcessing,  resetFormData) => {
    axios({
        url : 'https://server.landing-cost.chibuike.net/product/add',
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