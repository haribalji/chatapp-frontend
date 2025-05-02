import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { orange } from '../../constants/Color'
import {Menu as MenuIcon ,
     Search as SearchIcon ,
     Add as AddIcon
    ,Group as GroupIcon,
     Notifications as Notificationicon ,
    Logout as Logouticon} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { server } from '../../constants/config'
// import Search from '../specific/Search'

const Search=lazy(()=>import("../specific/Search"));
const  Notificatios=lazy(()=>import("../specific/Notifications"))
const Newgroup=lazy(()=>import("../specific/Newgroup"))
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast'
import { userNotExists } from '../../redux/reducers/auth'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
import { resetNotificationCount } from '../../redux/reducers/chat'

const Header=()=>{
const navigate=useNavigate();
const dispatch = useDispatch();



const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
);


const { notificationCount } = useSelector((state) => state.chat);

// const [ismobile, setismobile] = useState(false)
// const [issearch, setissearch] = useState(false)
// const [isnewgroup, setisnewgroup] = useState(false)
// const [isNotification, setisNotification] = useState(false)



const handleMobile=()=>{
    console.log("Mobile");
    // setismobile(prev=>!prev); // // what was it's previous value it's opposite value will be considred
    dispatch(setIsMobile(true)); // sets `isMobile` to true
//which enables the drawer to be open

}

const opensearchdialog=()=>{
    console.log("nmds")
console.log("opensearchdialog");
// setissearch(prev=>!prev)
dispatch(setIsSearch(true));
}

const opennewgroup=()=>{
    console.log("opennewgroup");
    // setisnewgroup(prev=>!prev)
      dispatch(setIsNewGroup(true));
    

}

const opennotification=()=>{
    console.log("opennotification");
    // setisNotification(prev=>!prev)
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
// reseting the  value to 0


}



const Navigatetogroup=()=>{
    console.log("Navigatetogroup");
    navigate("/Groups")

}
const Logouthandler=async()=>{
    console.log("Logouthandler");
    try {
        const { data } = await axios.get(`${server}/api/v1/user/logout`, {
          withCredentials: true,
        });
        dispatch(userNotExists());
        toast.success(data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
}

  return (
    // <div>
    //   hi from hari balaji
    // </div>
<>

<Box sx={{flexGrow:1}} height={"4rem"}>
    <AppBar position='static' sx={{
        bgcolor:orange
    }}>
        {/* it will be like a wrapper */}
  
  
<Toolbar>
    <Typography
    variant='h6'
    sx={{
        display:{xs:"none",sm:"block"},
    }}
    >
          Talkwithus
    </Typography>
    
    
<Box
   sx={{
    display:{xs:"block",sm:"none"},
}}>
<IconButton color="inherit" onClick={handleMobile}>
<MenuIcon/>
</IconButton>

</Box>


 <Box sx={{
    flexGrow:1}}
/>

<Box>
<IconBtn title={"Search"  }  icon={<SearchIcon/>
}     onClick={opensearchdialog}  />


{/* 
<Tooltip title="Search">
<IconButton color="inherit" size='large' onClick={opensearchdialog}>
<SearchIcon/>
</IconButton>
</Tooltip> */}


{/* here it is used for creating the new group */}
{/* <Tooltip title="New Group">
<IconButton color="inherit" size='large' onClick={opennewgroup}>
<AddIcon/>

</IconButton>
</Tooltip> */}


<IconBtn title={"New Group"  }  icon={<AddIcon/>
}     onClick={opennewgroup}  />





<IconBtn title={"Manage Groups " }  icon={<GroupIcon/>
}     onClick={Navigatetogroup}  />

{/* 
<Toolbar title="Manage Groups">
<IconButton color="inherit" size='large' onClick={Navigatetogroup}>
<GroupIcon/>

</IconButton>
</Toolbar> */}

{/* for notification */}

<IconBtn title={"Notifications" }  icon={<Notificationicon/>
}     onClick={opennotification} value={notificationCount} />



{/* for the logout */}
<IconBtn title={"Logout"  }  icon={<Logouticon/>
}     onClick={Logouthandler}  />



</Box>

    </Toolbar>  
  
    </AppBar>
</Box>





{/* 
<Suspense> is wrapping the <Search /> component.
fallback={<div>Loading........</div>} means that while <Search /> is being loaded, the text "Loading........" will be displayed.
Once <Search /> is ready, it will replace the loading message. */}


{

isSearch&&(
    <Suspense fallback={<Backdrop open/>}>
        {/* <Backdrop open/> transparent black screen will be displayed while rendering the component  */}
    <Search/>
   </Suspense>

)

}

{

isNotification&&(
    <Suspense fallback={<Backdrop open />}>
    <Notificatios/>
   </Suspense>

)

}
{

isNewGroup&&(
    <Suspense fallback={<Backdrop open />}>
    <Newgroup/>
   </Suspense>

)

}





</>

  )
}

// instead of creating the button again and again here we created the buttomn which can be used whenever it needed 

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
          {value ? (
            // passed value will be shown here
            <Badge badgeContent={value} color="error">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </IconButton>
      </Tooltip>
    );
  };

export default Header;
