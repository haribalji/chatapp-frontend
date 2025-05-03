import React, { useState } from 'react'
import { Container, Paper, TextField, Typography, Button, Stack, Avatar, IconButton  } from '@mui/material';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useFileHandler, useInputValidation ,useStrongPassword } from '6pp';
import {usernameValidator} from '../utils/validators'
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';
// import { server } from '../constants/config';
import axios from 'axios';
import { server } from "./constants/config";
 // const server ="https://chatapp-kchw.onrender.com";
function Login() {
    const [isLogin, setisLogin] = useState(true);
    const toggleLogin = () => setisLogin((prev)=>!prev);
    
    const name=useInputValidation("")//variable text  changing is identified during user typing in the form
    const bio=useInputValidation("")
    const username=useInputValidation("",usernameValidator)//usernameValidator will keep on tracking the user input if any error it will report that error
    // const password=useStrongPassword("")-->it can be used to password validation
    const password=useInputValidation("")
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

//    const avatar=useFileHandler("single",2)
//setting no of files need to get and it's capacity

const avatar=useFileHandler("single");


// now handling the submit work

// const handleLogin=(e)=>{
//     e.preventDefault();
// }

// const handleLogin = async (e) => {
//     console.log(username.value)

//     e.preventDefault();

//     const toastId = toast.loading("Logging In...");

//     setIsLoading(true);
//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {

//       const { data } = await axios.post(
//         `${server}/api/v1/user/login`,
//         {
//           username: username.value,
//           password: password.value,
//         },
//         config
//       );
//       dispatch(userExists(
//         // true
//         data.user

//       ));
//       toast.success(data.message
//       )
//     //   , {
//     //     id: toastId,
//     //   });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong"
//         , {
//         id: toastId,
//       }
//     );
//     } finally {
//       setIsLoading(false);
//     }
//   };
// const handleSignUp=(e)=>{ ok
//     e.preventDefault();
// }


// const handleSignUp = async (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append("avatar", avatar.file);
//     formData.append("name", name.value);
//     formData.append("bio", bio.value);
//     formData.append("username", username.value);
//     formData.append("password", password.value);
  
//     // Debug check
//     // for (let [key, value] of formData.entries()) {
//     //   console.log(key, value);
//     // }
  
//     const config = {
//       withCredentials: true,
//     };
  
//     try {
//       const { data } = await axios.post(
//         `${server}/api/v1/user/new`,
//         formData,
//         config
//       );
  
//       dispatch(userExists(true));
//       toast.success(data.message);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong");
//     }
//   };
  








// const handleLogin = async (e) => {
//     e.preventDefault();

//     const toastId = toast.loading("Logging In...");

//     setIsLoading(true);
//     const config = {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         `${server}/api/v1/user/login`,
//         {
//           username: username.value,
//           password: password.value,
//         },
//         config
//       );
//       dispatch(userExists(data.user));
//       toast.success(data.message, {
//         id: toastId,
//       });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something Went Wrong", {
//         id: toastId,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };



  // const handleSignUp = async (e) => {
  //   e.preventDefault();

  //   const toastId = toast.loading("Signing Up...");
  //   setIsLoading(true);

  //   const formData = new FormData();
  //   formData.append("avatar", avatar.file);
  //   formData.append("name", name.value);
  //   formData.append("bio", bio.value);
  //   formData.append("username", username.value);
  //   formData.append("password", password.value);

  //   const config = {
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   try {
  //     const { data } = await axios.post(
  //       `${server}/api/v1/user/new`,
  //       formData,
  //       config
  //     );

  //     dispatch(userExists(data.user));
  //     toast.success(data.message, {
  //       id: toastId,
  //     });
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || "Something Went Wrong", {
  //       id: toastId,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };








  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");//here we will get the toastid as it returns a unique toastId

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      //when this gets upadted the app.jsx will waiting for it  
      // if it got ,app.jsx  will allow's user  to enter into the application
      toast.success(data.message, {
        id: toastId,


        // Without id, users would see:

        // A loading toast
        
        // Then a separate success toast
        
        // With id, they just see:
        
        // A loading toast
        
        // It changes to a success toast

        // The id: toastId is used to identify that both toasts (loading and success/error) refer to the same toast, 
        // so that it avoids multiple toasts by updating the existing one, instead of stacking new ones.
 
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };





const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    console.log(username.value)

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

// console.log(data);
      dispatch(userExists(
        data.user

      ));
      toast.success(data.message //This is the success message you want to show (e.g., "logined  successfully").
        ,
         {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };


// Yes, the arrow function inside toggleLogin takes the previous state (referred to as prev) and returns the opposite value of the current state.
  



return (
        <div
style={{
    backgroundImage:"linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))"
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
                {
                    isLogin ? (
                        <>
                            <Typography variant="h5" >
                                Login
                            </Typography>
                            <form
                                style={{
                                    width: "100%",
                                    marginTop: "1rem"
                                }}

onSubmit={handleLogin}
                            >
                                <TextField requried fullWidth label="username" margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler}
                                     />
                                <TextField requried fullWidth label="password"
                                    type='password' margin='normal'
                                    variant='outlined'
                                          
                                    value={password.value}
                                    onChange={password.changeHandler}
                                    
                                    />
                                <Button sx={{ marginTop: "1rem" }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    disabled={isLoading}
                                >

                                    Login</Button>

                                <Typography textAlign={"center"}
                                    m={"1rem"}>
                                    OR
                                </Typography>
                                <Button
                                    variant="text"
                                    fullWidth
                                    onClick={toggleLogin}
                                    disabled={isLoading}

                                >
                                    sign up Instead</Button>

                            </form>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" >
                                Sign Up
                            </Typography>
                            <form
                                style={{
                                    width: "100%",
                                    marginTop: "1rem"
                                }}

                                onSubmit={handleSignUp}



                            >

                          <Stack 
                          position={"relative"}
                          width={"10rem"}
                          margin={"auto"}
                          >
                          <Avatar sx={{
                            width:"10rem",
                            height:"10rem",
                            objectFit:"contain",
                          }}
                          src={avatar.preview}
                          />
{
avatar.error&&(
    <Typography m={"1rem"}  color='error' variant='caption'>
        {avatar.error}
    </Typography>
)
}

<IconButton

// it is used to get input of profile image from the user
sx={{
    position:"absolute",
    bottom:"0",
    right:"0",
    // color:"white",
    bgcolor:"rgba(0,0,0,0,0.5",
    ":hover":{
        bgcolor:"rgba(0,0,0,0.7)",    
    
    },
}}
component="label"
>
   <>
   <CameraAltIcon />
 
   {/* <cameraAltIcon/> */}
   {/* <VisuallyHidden>Upload Avatar</VisuallyHidden> */}
   <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
   
   </> 
</IconButton>



                          </Stack>


                                <TextField requried fullWidth label="Name" margin='normal'
                                   required
                                    variant='outlined'
                                    value={name.value}
                                    onChange={name.changeHandler}
                                    />
                                <TextField requried fullWidth label="Bio"
                                required
                                 margin='normal'
                                    variant='outlined' 
                                    value={bio.value}
                                    onChange={bio.changeHandler}
                                    
                                    />

                                <TextField requried fullWidth label="username" margin='normal'
                                  required
                                    variant='outlined' 
                                    
                                    value={username.value}
                                    onChange={username.changeHandler}
                                    />


{

username.error&&(
    <Typography color='error' variant='caption'>
        {username.error}

    </Typography>
)
}







                                <TextField requried fullWidth label="password"
                                   required
                                    type='password' margin='normal'
                                    variant='outlined' 
                                    
                                    value={password.value}
                                    onChange={password.changeHandler}
                                    />

{/* 
{ this is used to for password validation

password.error&&(
    <Typography color='error' variant='caption'>
        {password.error}

    </Typography>
)
}

 */}


                                <Button sx={{ marginTop: "1rem" }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    disabled={isLoading}

                                >

                                    Sign UP</Button>

                                <Typography textAlign={"center"}
                                    m={"1rem"}>
                                    OR
                                </Typography>
                                <Button
                                   disabled={isLoading}
                                    fullWidth
                                    variant="text"
                                    
                                    onClick={toggleLogin}
                                >
                                    Login Instead</Button>

                            </form>
                        </>
                    )
                }

            </Paper>

        </Container>
        </div>
    );


}

export default Login
