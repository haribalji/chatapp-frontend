// import React from 'react'
import React, { useEffect, useState } from 'react'
import { Container, Paper, TextField, Typography, Button, Stack, Avatar, IconButton  } from '@mui/material';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch, useSelector } from "react-redux";

import { bggradient } from '../../constants/Color';
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom';
import { adminLogin, getAdmin } from "../../redux/thunks/admin.js";




// const isAdmin=true;
const AdminLogin = () => {
const { isAdmin } = useSelector((state) => state.auth);

const dispatch = useDispatch();

const secertkey=useInputValidation("");

  const submitHandler=(e)=>{
e.preventDefault();
console.log("submit");
// e.preventDefault();
// console.log(secertkey.value);

dispatch(adminLogin(secertkey.value));
// work flow
// This initiates the adminLogin async thunk. 
// Redux Toolkit immediately dispatches an action of type:

// "admin/login/pending"
// If the request succeeds
// "admin/login/fulfilled"
// if it fails (throws), 
// "admin/login/rejected"
// extraReducers listens for these cases
// If fulfilled → sets isAdmin = true and shows a success toast with the message from the backend.

// If rejected → sets isAdmin = false and shows an error toast with the caught error.
}
// if user is admin then move to the dashboard

useEffect(() => {
    dispatch(getAdmin());
    // while refresh or coming back to admin
    // after admin login we will enter into dashboard without entering the secert key
    // by getting the admintoken from the cookie we enter

  }, [dispatch]);


    if(isAdmin)return <Navigate to="/admin/dashboard"/>
  return (
    <div
style={{
backgroundImage:bggradient
}}
    >
    {/* // The Container component in Material-UI (MUI) is a wrapper component that helps manage the layout of your page content. It provides consistent padding and centers the content */}
    <Container component={"main"} maxWidth="xs"
        sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
        <Paper
            //   The Paper component in Material-UI (MUI) is used to create a surface that displays content with a simple material design aesthetic
            elevation={3}
            sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
           
                        <Typography variant="h5" >
                          Admin  Login
                        </Typography>
                        <form
                            style={{
                                width: "100%",
                                marginTop: "1rem"
                            }}

onSubmit={submitHandler}>

                            {/* <TextField requried fullWidth label="username" margin='normal'
                                variant='outlined'
                                value={username.value}
                                onChange={username.changeHandler}
                                 /> */}
                            <TextField requried fullWidth label="Secret Key"
                                type='password' margin='normal'
                                variant='outlined'
                                      
                                value={secertkey.value}
                                onChange={secertkey.changeHandler}
                                
                                />
                            <Button sx={{ marginTop: "1rem" }}
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >

                                Login</Button>


                        </form>
                    
            

        </Paper>

    </Container>
    </div>
);
}

export default AdminLogin
