import axios from 'axios'
const updateRate = (payload) => {
    axios({
        url : 'http://localhost:5001/settings/rate-update/', 
        method : 'put',
        data : payload
    }). 
    then(response => console.log(response)). 
    catch(err => console.log(err))
}   
export {updateRate}