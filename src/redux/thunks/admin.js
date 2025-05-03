import { createAsyncThunk } from "@reduxjs/toolkit";
// createAsyncThunk simplifies API requests in Redux.

// Automatically handles pending, fulfilled, and rejected states.
// eg:
// admin/login/pending → when the request starts
// admin/login/fulfilled → when the request succeeds
// admin/login/rejected → when the request fails

// note :
// createSlice defines the state and reducers

// createAsyncThunk performs API calls and connects to the slice through extraReducers



// import  server  from "../../constants/config.js";
 const server ="https://chatapp-kchw.onrender.com";

import axios from "axios";

// "admin/login", -->   // 🔹 action type name prefix

// secretKey --> here we  received the passed data


// when the error is throw it will be handled by backend also and in frontend we made extrareducer 
// to handle the success and failure of the request so in 2 ways we are indicating the error
const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  try {
    console.log('hello')
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${server}/api/v1/admin/verify`,
      { secretKey },
      config
    );

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  try {//from this route we can get admin data
    const { data } = await axios.get(`${server}/api/v1/admin/`, {
      withCredentials: true,
    });

    return data.admin;
  } catch (error) {
    throw error.response.data.message;
  }
});

const adminLogout = createAsyncThunk("admin/logout", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
      withCredentials: true,
    });

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

export { adminLogin,
    getAdmin,
     adminLogout
 };
