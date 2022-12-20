import { createSlice } from '@reduxjs/toolkit'
const sidebarSlice = createSlice({
    name : 'sidebar', 
    initialState : {
        isCollapsed : true,
        currentPage : null,
    }, 
    reducers : {
        collapseSidebar : (state) => {
            state.isCollapsed = false
        }, 
        expandSidebar : (state) => {
            state.isCollapsed = true
        },
        toggleSidebar : (state) => {
            state.isCollapsed = !state.isCollapsed
        },
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload
        }
    }
})
const actions = sidebarSlice.actions 
const sidebarReducer = sidebarSlice.reducer
export {sidebarReducer, actions}