import { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { Link } from 'react-router-dom'
const OrderTableActionRow = ({id}) => {
    const [dropdownIsEnabled, setDropdownIsEnabled] = useState(false)
    const toggleDropdown = () => {
        setDropdownIsEnabled(prev => !prev)
    }
    useEffect(() => {
        const disableDropdown = (e) => {
            if(!e.target.classList.contains('dropdown-caret-container')){
                setDropdownIsEnabled(false)
            }
        }
        document.addEventListener('click', disableDropdown)
        return () => document.removeEventListener('click', disableDropdown)
    }, [])
    return(
        <td className="table-new-body-data-action">
            <div 
                className="relative inline-block"
                >   
                <div 
                    className='hover:bg-gray-200 inline-block p-2 rounded-lg transition cursor-pointer dropdown-caret-container'
                    onClick={toggleDropdown}
                >
                    <MdArrowBackIosNew
                        color="blue"
                        className="arrow_icon-caret dropdown-caret-container"
                    />
                </div>
                {dropdownIsEnabled && <div className="absolute bg-white shadow-lg rounded-lg z-10 top-full left-[-50%] w-32 mt-2 py-2"> 
                    <Link
                        className="text-sm px-4 py-2 text-blue-600 hover:text-blue-900 transition cursor-pointer block"
                        to={`/review-order/${id}`}
                    > Open 
                    </Link>
                    <Link 
                        className="text-sm px-4 py-2 text-blue-600 hover:text-blue-900 transition cursor-pointer block"
                        to='/'
                    > Make inactive
                    </Link>
                </div>}
            </div>
        </td>

    )
}
export default OrderTableActionRow