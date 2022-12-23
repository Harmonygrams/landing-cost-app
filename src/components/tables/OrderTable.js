import { useEffect, useMemo, useState} from "react"
import OrderTableActionRow from "./OrderTableActionRow"
import { fetchOrders } from "../../api/fetchOrders"
const OrderTable = () => {
    const [orders, setOrders] = useState([])
    const renderOrders = useMemo(() => orders, [orders])
    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString()
        return formattedDate
    }
    useEffect(() => {
        fetchOrders(setOrders)
    }, [])
    return(
        <div> 
            <table className="table-new"> 
                <thead>
                    <tr className="table-new-heading__row">
                        <th className="table-new-heading__row-head"> Date </th>
                        <th className="table-new-heading__row-head"> Rate </th>
                        <th className="table-new-heading__row-head"> Commission </th>
                        <th className="table-new-heading__row-head"> Total Landing Cost </th>
                        <th className="table-new-heading__row-head"> Action </th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        renderOrders.map(order => {
                            return(
                                <tr key={order._id} className="table-new-body"> 
                                    <td className="table-new-body-data">{formatDate(order.date)}</td>
                                    <td className="table-new-body-data">{order.currency.primaryCurrency.symbol} {Number(order.currency.rate).toLocaleString()}</td>
                                    <td className="table-new-body-data">{order.currency.primaryCurrency.symbol} {(order.commission).toLocaleString()}</td>
                                    <td className="table-new-body-data">{order.currency.primaryCurrency.symbol} {(order.landingAmountTotal).toLocaleString()}</td>
                                    <OrderTableActionRow id={order._id}/>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}
export default OrderTable