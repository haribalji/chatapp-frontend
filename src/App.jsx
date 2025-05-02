import React,{lazy, Suspense, useEffect} from 'react';
import { CssBaseline } from '@mui/material';
// import { BrowserRouter  ,Routes,Route} from "react-router-dom";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
// import Home from './pages/Home';
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
// import AdminLogin from './pages/admin/AdminLogin';
// as here we getting the function from that layout
const Home=lazy(()=>import("./pages/Home"))
// React.lazy() is a function that allows you to dynamically import components (when it is needed or rendred), to improve the performance and not rendering everything intially
const Login=lazy(()=>import("./pages/Login"))
const Chat=lazy(()=>import("./pages/Chat"));
const Groups=lazy(()=>import("./pages/Groups"))
const Notfound=lazy(()=>import("./pages/Notfound"))
const AdminLogin=lazy(()=>import("./pages/admin/AdminLogin"))
const Dashboard=lazy(()=>import("./pages/admin/Dashboard"))

const Chatmanagement=lazy(()=>import("./pages/admin/Chatmanagement"))
const Messagemanagement=lazy(()=>import("./pages/admin/Messagemanagement"))
const Usermanagement=lazy(()=>import("./pages/admin/Usermanagement"))




import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { server } from "./constants/config";
import { userExists, userNotExists } from './redux/reducers/auth';
import { Toaster } from "react-hot-toast";
import { SocketProvider } from './socket';

// let user=true;


const App = () => {

  const dispatch = useDispatch();
// user:  {
//     "avatar": {
//         "public_id": "02931d5c-1adf-4fc0-8b6a-3da13db7d9b3",
//         "url": "https://res.cloudinary.com/dbfyjehcn/image/upload/v1745132435/02931d5c-1adf-4fc0-8b6a-3da13db7d9b3.webp"
//     },
//     "_id": "68049b956ef51c9edc8bef2c",
//     "name": "dfvxcxfsd n  ",
//     "username": "mmdmm",
//     "createdAt": "2025-04-20T07:00:37.285Z",
//     "updatedAt": "2025-04-20T07:00:37.285Z",
//     "__v": 0
// }
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data })   =>dispatch(userExists(data.user)))//it will fill user data in the reducer
      // So when you dispatch userExists(data.user), it sets state.user in your Redux store.
      .catch((err) => dispatch(userNotExists()));//If not logged in → user is null. 
      // and loader is false then it will directly hit  the  protectroute if the user logined it will 
      // allow the  other component to appear else login


  }
  , [dispatch]
  
  
  );
  const { user, loader } = useSelector((state) => state.auth);

  // if loader become false then only remain component will be render
  return loader? <LayoutLoader/>:
  (
    <>
    
        {/* <Toaster position="bottom-center" /> */}

     <Router>
      {/* <span>General</span> */}
      <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        {/* <Route path="/home" element={
          // <Home/>
      
      <ProtectRoute user={user}>
    <Home/>
</ProtectRoute> 
      
      
      // } /> */}

{/* 

This wraps all its nested routes inside ProtectRoute.

The ProtectRoute will:

Check if user is valid.

If not → redirect to login.

If yes → render an <Outlet /> which allows the nested routes  component to show up. */}
      <Route element={

        <SocketProvider>
{/* <SocketProvider> 
initializes:
It creates a socket connection using io(server) inside a useMemo.
It provides that socket instance to the entire tree below it via React Context: */}
 <ProtectRoute user={user}/>

{/* 
 So all of these children routes will be rendered inside ProtectRoute,
  which is itself wrapped by SocketProvider. 
  All Components Get Socket Access & Are Protected
  */}
        </SocketProvider>

       }>

      <Route path="/" element={    <Home/>}/> 
      {/* { here we seted in such way that it will rendred } */}
      <Route path="/Chat/:chatId" element={<Chat />} />
        {/* This is for dynamic rendering particular chat */}
        <Route path="/Groups" element={<Groups />} />
      
      
      </Route>

        <Route path="/login" element={
        <ProtectRoute user={!user} redirect='/'>
     {/* if the user the user already logined means it will be redirect to home page other wise it will render the
     login component */}
         <Login />
    </ProtectRoute> 
      
      } />
        {/* <Route path="/Chat/:chatid" element={<Chat />} />
        {/* This is for dynamic rendering particular chat */}
        {/* <Route path="/Groups" element={<Groups />} /> */} 


<Route  path="/admin" element={<AdminLogin/>}/>
<Route  path="/admin/dashboard" element={<Dashboard/>}/>

<Route  path="/admin/chats-management" element={<Chatmanagement/>}/>
<Route  path="/admin/messages" element={<Messagemanagement/>}/>
<Route  path="/admin/users-management" element={<Usermanagement/>}/>


        <Route path="*" element={<Notfound/>}/> 
        {/* when not exisited url hited then this compontent will be rendred */}
      </Routes>

      </Suspense>
              <Toaster position="bottom-center" />

    </Router>  
    {/* <div>
      app
    </div> */}

    </>
  )
}

export default App
