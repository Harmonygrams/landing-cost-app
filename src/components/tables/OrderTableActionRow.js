import { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
import { ScaleLoader } from 'react-spinners'
import { toggleOrderState } from '../../api/toggleOrderState'
const OrderTableActionRow = ({id}) => {
    const [dropdownIsEnabled, setDropdownIsEnabled] = useState(false)
    const [onPageDataLoader, setOnPageDataLoader] = useState({
        loadingMakeInactive : false
    })
    const [makeInactiveDialogue, setMakeInactiveDialog] = useState(false)
    const toggleDropdown = () => {
        setDropdownIsEnabled(prev => !prev)
    }
    const updateDialog = () => {
        setOnPageDataLoader(prev => ({...prev, loadingMakeInactive : true}))
        toggleOrderState('', setOnPageDataLoader, id)
        setMakeInactiveDialog(false)
        window.location.reload()
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
                    <p 
                        className="text-sm px-4 py-2 text-blue-600 hover:text-blue-900 transition cursor-pointer block"
                        onClick={() => setMakeInactiveDialog(true)}
                    > Make inactive
                    </p>
                </div>}
            </div>
            {makeInactiveDialogue && <div 
                role="dialog" 
                className='absolute left-0 top-0 w-screen h-screen bg-white transparent__container flex items-center justify-center'
            >
                <div 
                    className='bg-white py-6 px-8 rounded-lg'
                >
                    <div className='p-2 flex justify-end mb-2'> 
                        <GrClose 
                            className='cursor-pointer'
                            onClick={() => setMakeInactiveDialog(false)}
                        />
                    </div>
                    <p className='text-lg mb-6 text-gray-700'>Are you sure you want to make this item inactive?</p>
                    <div className='flex justify-end gap-2'> 
                        <button 
                            className='px-4 py-1 bg-white text-gray-800 border-2 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition'
                            onClick={() => setMakeInactiveDialog(false)}
                        > Cancel  </button>
                        <button 
                            className='px-4 py-1 bg-gray-800 text-white border-2 border-gray-800 rounded-lg flex items-center gap-2 hover:bg-black transition'
                            onClick={updateDialog}
                        >Continue
                        {onPageDataLoader.loadingMakeInactive ?
                            <ScaleLoader width={2} height={18} color = 'white'/> : ''
                        }
                        </button>
                    </div>
                </div>
            </div> }
        </td>


    )
}
export default OrderTableActionRow