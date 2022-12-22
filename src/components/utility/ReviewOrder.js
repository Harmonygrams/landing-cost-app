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
    console.log(order)
    return(
        <div className=" h-full">
            <div className="flex items-center gap-2 mt-2 text-blue-600 text-sm">
                <MdArrowBackIosNew />
                <a 
                    href="/orders"
                    className="underline"
                > Back to orders</a>
            </div> 
            <div className='bg-white h-full rounded-lg px-6'>
                <div className='text-center text-white py-2 rounded-lg mt-1'> 
                    <h1 className="text-xl font-semibold text-black text-gray-600"> Order Summary </h1> 
                </div>
                <div>
                    <p className='text-gray-700'> Your fulfilled order details </p>
                </div>
                <div className='flex justify-between flex-wrap gap-4 border-y-2 py-6 mt-4'> 
                    <div>
                        <h4 className='text-gray-500 text-sm'> Order Date </h4>
                        <p className='text-gray-800 text-sm'>18 March, 2021</p>
                    </div>
                    <div>
                        <h4 className='text-gray-500 text-sm'> Rate </h4>
                        <p className='text-gray-800 text-sm'>18 March, 2021</p>
                    </div>
                    <div>
                        <h4 className='text-gray-500 text-sm'> Commission </h4>
                        <p className='text-gray-800 text-sm'>18 March, 2021</p>
                    </div>
                    <div>
                        <h4 className='text-gray-500 text-sm'> Order Date </h4>
                        <p className='text-gray-800 text-sm'>18 March, 2021</p>
                    </div>
                </div>
                <ul className='border-b-2 py-4'> 
                    <li className='flex justify-between mb-4'>
                        <div className=''> 
                            <h3 className='font-medium text-gray-800'>Gucci Bag </h3>
                            <p className='font-light text-sm'> Durable Gucci Bag for purchases</p>
                        </div>
                        <p className='font-light text-sm'> Qty 1</p>
                        <p className='font-medium text-sm'> ₦12,344.54 </p>
                    </li>
                    <li className='flex justify-between mb-4'>
                        <div className=''> 
                            <h3 className='font-medium text-gray-800'>Gucci Bag </h3>
                            <p className='font-light text-sm'> Durable Gucci Bag for purchases</p>
                        </div>
                        <p className='font-light text-sm'> Qty 1</p>
                        <p className='font-medium text-sm'> ₦12,344.54 </p>
                    </li>
                    <li className='flex justify-between mb-4'>
                        <div className=''> 
                            <h3 className='font-medium text-gray-800'>Gucci Bag </h3>
                            <p className='font-light text-sm'> Durable Gucci Bag for purchases</p>
                        </div>
                        <p className='font-light text-sm'> Qty 1</p>
                        <p className='font-medium text-sm'> ₦12,344.54 </p>
                    </li>
                    <li className='flex justify-between mb-4'>
                        <div className=''> 
                            <h3 className='font-medium text-gray-800'>Gucci Bag </h3>
                            <p className='font-light text-sm'> Durable Gucci Bag for purchases</p>
                        </div>
                        <p className='font-light text-sm'> Qty 1</p>
                        <p className='font-medium text-sm'> ₦12,344.54 </p>
                    </li>
                    <li className='flex justify-between mb-4'>
                        <div className=''> 
                            <h3 className='font-medium text-gray-800'>Gucci Bag </h3>
                            <p className='font-light text-sm'> Durable Gucci Bag for purchases</p>
                        </div>
                        <p className='font-light text-sm'> Qty 1</p>
                        <p className='font-medium text-sm'> ₦12,344.54 </p>
                    </li>
                </ul>
                {/* <table className='w-full mt-2'> 
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
                </table> */}
            </div> 
        </div>
    )
}
export default ReviewOrder

