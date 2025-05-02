import { Box, Drawer, Grid, IconButton, Stack, styled, Typography} from '@mui/material'
import React, { useState } from 'react'
import { grayColor, matBlack } from '../../constants/Color'
import {Close as CloseIcon, Construction, ExitToApp as ExitToAppIcon, Groups as GroupsIcon,
   ManageAccounts as ManageAccountsIcon, Menu as MenuIcon,
    Message as MessageIcon} from "@mui/icons-material"
import { useLocation,Link as LinkComponent, Navigate } from 'react-router-dom'
import { Dashboard as DashboardIcon  } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../../redux/thunks/admin'
// import {Link} from "../styles/StyledComponents" 

export const Link = styled(LinkComponent)`
  text-decoration: none;
   border-radius:2rem
   color:black;
  padding: 1rem 2rem;

  &:hover {  /* Corrected */
    color: rgba(0,0,0,0.54);
  }
`;


const adminTabs=[{
  name:"Dashboard",
  path:"/admin/dashboard",
  icon:<DashboardIcon/>
},
{
  name:"Users",
  path:"/admin/users-management",
  icon:<ManageAccountsIcon/>
},{
  name:"Chats",
  path:"/admin/chats-management",
  icon:<GroupsIcon/>
},{
  name:"Messages",
  path:"/admin/messages",
  icon:<MessageIcon/>
}]


const Sidebar=({w="100%"})=>{//setting the default width value
  
  const location=useLocation();//track the current url  
  const dispatch = useDispatch();

  // const logoutHandler = () => {
  //   dispatch(adminLogout());
  // };
 const logoutHandler=()=>{
  console.log("logoutHandler");
  dispatch(adminLogout());

 }


  return <Stack width={w} direction={"column"}
  p={"3rem"} spacing={"3rem"}>

<Typography variant='h5' textTransform={"uppercase"}>

product title

</Typography>
<Stack spacing={"1rem"}>
{
  adminTabs.map((tab)=>(
    <Link key={tab.path} to={tab.path}
    
    sx={
// which url is matching that particular tab will be affected by style
      location.pathname===tab.path && {
        bgcolor:matBlack,
        color:"white",
        ":hover":{color:'white'}
      }
    }
    
    
    >

<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
{tab.icon}
<Typography >{tab.name}</Typography>
</Stack>



    </Link>
  )) 
}

<Link 
onClick={logoutHandler}
    >

<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
<ExitToAppIcon/>

<Typography>Logout</Typography>
</Stack>



    </Link>




</Stack>

  </Stack>
}


// const isAdmin=true;
const AdminLayout = ({children}) => {
  const { isAdmin } = useSelector((state) => state.auth);

    const [isMobile,setisMobile]=useState(false)
    const handleMobile=()=>setisMobile(!isMobile);
    const handleclose=()=>setisMobile(false);
    if(!isAdmin)return <Navigate to="/admin"/>
return (

<Grid container minHeight={"100vh"}>

<Box
sx={{
    display:{xs:"block",md:"none"},
    position:"fixed",
    right:"1rem",
    top:"1rem",}}
>
    <IconButton onClick={handleMobile}>
      {

        isMobile?<CloseIcon/>:<MenuIcon/>
      }
      
      
      
       {/* <MenuIcon/>  */}
    </IconButton>


</Box>



    <Grid item
    md={4}
    lg={3}
    sx={{display:{xs:"none",md:"block"}}}
    >

<Sidebar/>



    </Grid>





<Grid item
xs={12}
    md={8}
    lg={9}
    sx={{
        bgcolor:grayColor
    }}>

   {children}



</Grid>

{/* <Drawer>: A component that creates a sliding sidebar or menu. */}
{/* If isMobile is true, the drawer will be open, displaying the
 sidebar at 50% of the viewport width. When the user clicks 
 outside or performs an action that triggers handleclose, the
  drawer will close. */}
<Drawer open={isMobile}  onClose={handleclose}>
<Sidebar w="50vw"/>

</Drawer>





</Grid>



    // <div>
    //   Admin LayoutL
    //   {children}
    // </div>
  )
}

export default AdminLayout
