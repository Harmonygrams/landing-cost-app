import { useTable } from 'react-table'
import { useState, useMemo, useEffect} from 'react'
import COLUMNS from '../../config/productTableColumns'
import { fetchProducts } from '../../api/fetchProducts'
const ProductTable = () => {
    const [productTableData, setProductTableData] = useState({
        columns : [], 
        data : [],
    })
    const columns = useMemo(() => productTableData.columns, [productTableData.columns])
    const data = useMemo(() => productTableData.data, [productTableData.data])
    const tableInstance = useTable({columns, data})
    const {
        getTableProps,
        getTableBodyProps, 
        headerGroups, 
        prepareRow, 
        rows
    } = tableInstance
    useEffect(() => {
        setProductTableData(prev => ({...prev, columns : COLUMNS}))
        fetchProducts(setProductTableData)
    }, [])
    return(
        <table {...getTableProps()} className="table-new"> 
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className='table-new-heading__row'>
                        {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}  className="table-new-heading__row-head">
                                    {column.render('Header')}
                                </th>
                            ))
                        }
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}> 
                {
                    rows.map(row => {
                        prepareRow(row) 
                        return(
                            <tr {...row.getRowProps()} className="table-new-body">
                                {
                                    row.cells.map(cell => (
                                        <td {...cell.getCellProps()}  className="table-new-body-data"
                                    >
                                            <div className=''> 
                                                {cell.render('Cell')}
                                            </div>
                                        </td>
                                    ))
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default ProductTable