import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message
  
  as MessageIcon, Notifications as NotificationsIcon,
  
  Person as PersonIcon} from '@mui/icons-material'
// import moment from 'moment'
import moment from 'moment'
import { SearchField,CurveButton } from '../../components/styles/StyledComponents'
import { matBlack } from '../../constants/Color'
import { LineChart ,DoughnutChart } from '../../components/specific/Chart'
import { useFetchData } from "6pp";

import { server } from '../../constants/config'
import { useErrors } from "../../hooks/hook.js";
import axios from 'axios'
// import {useFetchData} from "../hooks/useFetchData.js";

// Dashboard.jsx or wherever you're using it
// import useFetchData from "../hooks/useFetchData"; // update the path based on your file structure
// const server = "http://localhost:3000"; // change to your backend URL if deployed

const Dashboard = () => {
  // const { loading, data, error } = useFetchData(
  //   `http://localhost:3000/api/v1/admin/stats`,
  //   "dashboard-stats"
  // );
  // const { loading, data, error } = useFetchData(
  //   `${server}/api/v1/admin/stats`,
  //   "dashboard-stats"
  // );


  // const fetchResult = useFetchData(`${server}/api/v1/admin/stats`, "dashboard-stats");

  // const loading = fetchResult.loading;
  // const data = fetchResult.data;
  // const error = fetchResult.error;
    
    
    //    "dashboard-stats" it is for caching purpose


  // console.log(data)

  // const { stats } = data || {};

  // useErrors([
  //   {
  //     isError: error,
  //     error: error,
  //   },
  // ]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const server = "http://localhost:3000";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/admin/stats`, {
          withCredentials: true, // if you're using cookies/session
        });
        setStats(data.stats);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

// console.log(stats)

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);


  const Appbar=<Paper
  elevation={3}
  sx={{padding:"2rem",margin:"2rem 0",

    borderRadius:"1rem"
  }}
  
  >
<Stack direction={"row"} alignItems={"center"}

spacing={"1rem"}

>
  <AdminPanelSettingsIcon sx={{fontSize:"3rem"}}/>
  <SearchField/>
  <CurveButton>Search </CurveButton>
<Box flexGrow={1}/>
<Typography

display={{
  xs:"none",
  lg:"block"
}}

color={"rgba(0,0,0,0.7)"}

textAlign={"center"}




>
  
  
  {moment().format("dddd,D MMMM  YYYY")}</Typography>


<NotificationsIcon/>

</Stack>



  </Paper>
  const Widgets= (<Stack
  
  direction={{
    xs:"column",
    sm:"row"
  }}

  spacing="2rem"
  justifyContent="space-evenly"
  alignItems={"center"}
  margin={"2rem 0"}
  
  >

{/* hari balaji H */}

<Widget title={"user"} value={stats?.usersCount} Icon={<PersonIcon/>}/>
<Widget title={"chats"} value={stats?.totalChatsCount} Icon={<GroupIcon/>}/>
<Widget title={"messages"} value={stats?.messagesCount} Icon={<MessageIcon/>}/>
{/* <Widget title={"user"} value={34}/> */}

  </Stack>
  // <>hari Widgets</>
)

// console.log(data)

  return (
    <AdminLayout>
       {loading ? (
        <Skeleton height={"100vh"} />
      ) :
(    
<Container component={"main"}>


  {Appbar}

  <Stack  direction={
    {
    xs:"column",//if the screen is smaller then it will be shown in column wise
    lg:"row"//if the screen is of large screen then the graph will be
    // ṣhown  in row-wise

    }
  }
  // spacing={"2rem"}
  flexWrap={"wrap"} 
  justifyContent={"center"}
  alignItems={{
    xs:"center",
    lg:"stretch"
  }}
  sx={{gap:"2rem"}}
  >
    
    
    <Paper
    elevation={3}
    sx={{padding:"2rem 3.5rem",
      borderRadius:"1rem",
      width:"100%",
      // position: "relative",

      maxWidth:"45rem",
      // height:"25rem"
    }}
    
    
    
    >
      <Typography margin={"2rem 0"} variant='h4'>last Messages</Typography>
{"chat"}
{/*  */}
<LineChart value={stats.messagesChart||[]
}/>



    </Paper>
<Paper
elevation={3}
sx={{
padding:"1rem",
borderRadius:"1rem",
display:"flex",
justifyContent:"center",
alignItems:"center",
width:{xs:"100%",sm:"50%"},
position:"relative",
// width:"100%",
maxWidth:"25rem",
// height:"25rem"


}}>
{/* {" Dougnut chart"} */}
<DoughnutChart labels={["singleChat","Groupchats"]}

value={[
  stats?.totalChatsCount - stats?.groupsCount || 0,
  stats?.groupsCount || 0,
]} />

<Stack
position={"absolute"}
direction={"row"}
justifyContent={"center"}
alignItems={"center"}
spacing={"0.5rem"}
width={"100%"}
height={"100%"}


>

  <GroupIcon/><Typography> vs</Typography>
 <PersonIcon/>
</Stack>





</Paper>









     </Stack>

  {
Widgets



  }
</Container>)

  }
    </AdminLayout>

  )
}
const  Widget=({title,value,Icon})=><Paper
elevation={3}
// elevation={0} means no shadow (flat).

// Higher values (e.g., elevation={3} or elevation={10}) create a stronger shadow,
//  making the element appear more raised.
sx={{
  padding:"2rem",
  margin:"2rem 0",
  borderRadius:"1.5rem",
  width:"20rem"
}}


>



<Stack alignItems={"center"} spacing={"1rem"}>


<Typography
sx={{
color:"rgba(0,0,0,0.7)",
borderRadius:"50%",
border:`5px solid ${matBlack}`,
width:"5rem",
height:"5rem",
display:"flex",
justifyContent:"center",
alignItems:"center",
}}
>{value}</Typography>

<Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
  {Icon}
  <Typography>  {title}
  </Typography>
</Stack>

</Stack>

</Paper>

export default Dashboard
