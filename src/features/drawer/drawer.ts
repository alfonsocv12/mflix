import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface DrawerState {
    isOpen: boolean
}

const initialState: DrawerState = {
    isOpen: false
}

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        onOpen: (state) => { state.isOpen = true },
        onClose: (state) => { state.isOpen = false }
    }
})

export const selectDrawerIsOpen = (state: RootState) => state.drawer.isOpen;
export const drawerUseDisclosure = (state: RootState) => { 
    return {
        isOpen: state.drawer.isOpen,
        onOpen: drawerSlice.actions.onOpen,
        onClose: drawerSlice.actions.onClose
    }
}

export default drawerSlice.reducer;