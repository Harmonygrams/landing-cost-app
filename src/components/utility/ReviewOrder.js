import {MdArrowBackIosNew} from 'react-icons/md'
import {fetchOrders} from '../../api/fetchOrders'
import { nanoid } from 'nanoid'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
const ReviewOrder = () => {
    const params = useParams()
    const [order, setOrders] = useState({
    })
    const [onPageDataLoader, setOnPageDataLoader] = useState({
        orders : true,
    })
    const renderOrders = useMemo(() => order, [order])
    useEffect(() => {
        fetchOrders(setOrders, setOnPageDataLoader, {id : params.id})
    }, [])
    return(
        <div className=" h-full">
            <div className="flex items-center gap-2 mt-2 text-blue-600 text-sm">
                <MdArrowBackIosNew />
                <a 
                    href="/orders"
                    className="underline"
                > Back to orders</a>
            </div> 
            <div className='bg-white h-full'>
                <div className='text-center bg-black text-white py-2 rounded-lg mt-2'> 
                    <h1 className="text-xl font-semibold"> Estimated Landing Cost</h1> 
                    <p> (Expenses Included)</p>
                </div>
                <table className='w-full mt-4'> 
                    <thead> 
                        <tr key={nanoid()}> 
                            <th className='text-left landing__cost-table px-4 py-2'>Item</th>
                            <th className='text-left landing__cost-table px-4 py-2'> Quantity </th>
                            <th className='text-left landing__cost-table px-4 py-2'>Landing Cost</th>
                            <th className='text-left landing__cost-table px-4 py-2'>Charges</th>
                            <th className='text-left landing__cost-table px-4 py-2'>Landing Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                            <td className='landing__cost-table px-4 py-2'> Hello </td>
                            <td className='landing__cost-table px-4 py-2'> Hello </td>
                            <td className='landing__cost-table px-4 py-2'> Hello </td>
                            <td className='landing__cost-table px-4 py-2'> Hello </td>
                            <td className='landing__cost-table px-4 py-2'> Hello </td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </div>
    )
}
export default ReviewOrder

