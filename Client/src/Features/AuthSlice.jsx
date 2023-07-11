import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};


const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredential:(state,action)=>{
            state.userInfo = action.payload;
            console.log(state.userInfo,"inslice");
        },
        logout:(state,action)=>{
            state.userInfo = null;
            console.log(state.userInfo,"inslice");
        }
    }
})

export const {setCredential,logout}=authSlice.actions
export default authSlice.reducer