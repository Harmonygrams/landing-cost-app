import axios from 'axios'
const updateRate = (payload) => {
    axios({
        url : 'https://server.landing-cost.chibuike.net/settings/rate-update/', 
        method : 'put',
        data : payload
    }). 
    then(response => console.log(response)). 
    catch(err => console.log(err))
}   
export {updateRate}