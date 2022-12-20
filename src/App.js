import './App.css'
import { Sidebar } from './components/'
import {Routes, Route} from 'react-router-dom'
import {Expenses, Navbar, Orders, Products, Settings, ReviewOrder} from './components/index'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { actions as sidebarActions} from './store/sidebarSlice/sidebarSlice'
function App() {
  const dispatch = useDispatch()
  const sidebarIsOpen = useSelector(state => state.sidebar.isCollapsed)
  useEffect(() => {
    const collapseSidebar = () => {
      if(window.innerWidth <= 768 && sidebarIsOpen){
        dispatch(sidebarActions.collapseSidebar())
      }
    }
    window.addEventListener('resize', collapseSidebar)
    return () => window.removeEventListener('resize', collapseSidebar)
  }, [])
  return (
    <div className="App relative md:flex">
       {sidebarIsOpen && <Sidebar />}
       <main className='border-2 w-full py-6 px-4 h-screen overflow-y-scroll'> 
        <Navbar />
        <Routes> 
          <Route path="/expenses" element={<Expenses />}/>
          <Route path="/products" element={<Products />}/>
          <Route path='/orders' element={<Orders />} />
          <Route path="/settings" element = {<Settings />} />
          <Route path="/review-order/:id" element={<ReviewOrder />} />
        </Routes>
       </main>
    </div>
  );
}
export default App;
