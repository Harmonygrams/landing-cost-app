import { useState, useMemo, useEffect } from 'react'
import { useTable } from 'react-table'
import expenseTableColumns from '../../config/expenseTableColumns'
import { fetchExpenses } from '../../api/fetchExpenses'
const ExpensesTable = () => {
    const [expenses, setExpenses] = useState({
        columns : [], 
        data : []
    })
    const columns = useMemo(() => expenses.columns, [expenses.columns])
    const data = useMemo(() => expenses.data, [expenses.data])
    const tableInstance = useTable({columns, data})
    const {
        getTableProps,
        getTableBodyProps, 
        headerGroups, 
        prepareRow, 
        rows,
    }

    = tableInstance
    useEffect(() => {
        setExpenses(prev => ({...prev, columns : expenseTableColumns}))
        fetchExpenses(setExpenses)
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
export default ExpensesTable