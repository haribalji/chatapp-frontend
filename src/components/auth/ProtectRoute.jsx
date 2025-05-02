import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
const ProtectRoute=({children,user,redirect='/login'})=> {
//if the variable paseed from the child component then that value will be used here
//if the person is not the user then  redirect to login page
if(!user)return <Navigate to={redirect}/>

// if not you can return the children
return  children ? children :<Outlet/>;//it will try to match with url and render corresponding  component

}


// What's <Outlet />?
// It's used in nested routes.

// It tells React Router: “Render the child route 
// that matches the current URL.”



export default  ProtectRoute;

{/* <ProtectRoute user={user}>
    <Home/>
</ProtectRoute> 
here what are the component that come inside  the protectroute 
// here home component is the children of this protectroute
*/}