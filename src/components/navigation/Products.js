import { useEffect, useState} from "react"
import {actions as sidebarActions} from '../../store/sidebarSlice/sidebarSlice'
import { useDispatch } from "react-redux"
import { ScaleLoader } from "react-spinners"
import ProductTable from "../tables/ProductTable"
import { BiWallet} from 'react-icons/bi'
import { fetchProductsCount } from "../../api/fetchProductsCount"
import {FiShoppingBag} from 'react-icons/fi'
import AddProduct from "../utility/AddProduct"
const Products = () => {
    const dispatch = useDispatch()
    const [productCount, setProductCount] = useState(false)
    const [enableAddNewProduct, setEnableAddNewProduct] = useState(false)
    const [onPageDataLoader, setOnPageDataLoader] = useState({
        productCount : true,
    })
    useEffect(() => {
        document.title = "Products"
        fetchProductsCount(setProductCount, setOnPageDataLoader)
        dispatch(sidebarActions.setCurrentPage('products'))
    }, [])
    useEffect(() => {
    }, [productCount])
    return(
        <div className = ""> 
            <div className="flex flex-col gap-4 mb-8 md:flex-row mt-4"> 
                <div className="w-full  bg-white py-4 px-6 rounded-lg hover:shadow-lg transition cursor-pointer">
                    <div>
                        <div className="bg-gray-200 inline-block p-2 rounded-lg"> 
                            <FiShoppingBag 
                                className="text-2xl"
                            />
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Total Stocks</p>
                    <h2 className="text-2xl md:text-4xl mt-2">
                    {onPageDataLoader.productCount ? 
                        <ScaleLoader
                            width={2} 
                            height={18}
                        />
                        :
                        productCount 
                    }
                    </h2>
                </div>
                <div className="w-full bg-white py-4 px-6 rounded-lg hover:shadow-lg transition cursor-pointer">
                    <div>
                        <div className="bg-gray-200 inline-block p-2 rounded-lg"> 
                            <BiWallet 
                                className="text-2xl"
                            />
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Total Cost</p>
                    <h2 className="text-2xl md:text-4xl mt-2">
                    {
                        <ScaleLoader
                            width={2} 
                            height={18}
                        />
                    }
                    </h2>
                </div>
            </div>
            <div className="flex justify-between mb-8"> 
                <input 
                    placeholder="Search Products"
                    className="text-sm md:text-sm px-4 md:px-4 py-2 md:py-2 rounded-lg transition outline-black"
                />
                <button 
                    className="add__new-button text-sm md:text-sm px-4 md:px-4 py-2 md:py-2 rounded-lg hover:bg-white border-black border-2 hover:text-black transition text-white"
                    onClick = {() => setEnableAddNewProduct(true)}
                > New product</button>
            </div>
            <ProductTable />
            {enableAddNewProduct && <AddProduct closeWindow = {() => setEnableAddNewProduct(false)}/>}
        </div>
    )
}
export default Products