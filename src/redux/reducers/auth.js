import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogout, getAdmin } from "../thunks/admin";
import toast from "react-hot-toast";
const initialState = {
    user: null,
    isAdmin: false,
    loader: true,
  };
const authSlice = createSlice({
    // createSlice is a function provided by Redux Toolkit that helps you write Redux logic more efficiently and with less boilerplate.
    name: "auth",//here we are naming the slice 

    initialState,
    reducers: {
      userExists: (state, action) => {//it is one type of reducer
        state.user = action.payload;
        state.loader = false;
      },
      userNotExists: (state) => {
        state.user = null;
        state.loader = false;//not logined also
      },
    },




    // Calling dispatch(adminLogin(secretKey)) triggers the thunk, which automatically 
    // triggers these reducers based on success or failure.
    // createAsyncThunk will automatically trigger extraReducers
    extraReducers: (builder) => {
      builder//Each .addCase() listens for a specific state of an async thunk:
        .addCase(adminLogin.fulfilled, (state, action) => {
          state.isAdmin = true;
          toast.success(action.payload);//it trigger the toast messages
        })
        .addCase(adminLogin.rejected, (state, action) => {
          state.isAdmin = false;
          toast.error(action.error.message);
        })
         
        .addCase(getAdmin.fulfilled, (state, action) => {
          if (action.payload) {
            state.isAdmin = true;
          } else {
            state.isAdmin = false;
          }
        })
        .addCase(getAdmin.rejected, (state, action) => {
          state.isAdmin = false;
        })
        .addCase(adminLogout.fulfilled, (state, action) => {
          state.isAdmin = false;
          toast.success(action.payload);
        })
        .addCase(adminLogout.rejected, (state, action) => {
          state.isAdmin = true;
          toast.error(action.error.message);
        });
      },

});




export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;//from here we doing deconstruction of reducer