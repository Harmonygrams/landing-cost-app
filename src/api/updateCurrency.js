import axios from 'axios'
const updateCurrency = (payload, status) => {
    return(
        axios({
            url : 'http://localhost:5001/settings/currency-update/', 
            method : 'put',
            data : payload
        }).
        then(response => {
            if(response.data.success){
                status(false)
            }}). 
        catch(err => {
            status(false)
            console.log('Error sending request')
        })
    )
}
export default updateCurrency