import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};


const adminAuthSlice= createSlice({
    name: "adminAuth",
    initialState,
    reducers:{
        setAdminCredential:(state,action)=>{
            state.adminInfo = action.payload;
        },
        adminLogout:(state,action)=>{
            state.adminInfo = null;
        }
    }
})

export const {setAdminCredential,adminLogout}=adminAuthSlice.actions
export default adminAuthSlice.reducer