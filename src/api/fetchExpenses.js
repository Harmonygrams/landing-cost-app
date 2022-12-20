import axios from 'axios'
const fetchExpenses = (setExpenses, query) => {
    axios({
        url : 'http://localhost:5001/expense/fetch', 
        method : 'post',
        data : '', 

    }). 
    then(response => response.data).
    then(data => {
        if(data.success){
            setExpenses(prev => ({...prev, data : data.data}))
        }
    }).
    catch(err => console.log(err))
}
export { fetchExpenses }