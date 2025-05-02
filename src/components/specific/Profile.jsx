import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react'
import { Face as Faceicon,AlternateEmail as Username 
   ,
   CalendarMonth as CalendarIcon
} from '@mui/icons-material';

import moment from "moment";
import { transformImage } from '../../lib/features';

const Profile=({user})=>{
  return (
    <div>
<Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
<Avatar
src={transformImage(
  user?.avatar?.url)}
sx={{
  width:200,
  height:200,
  objectFit:"contain",
  marginBottom:"1rem",
  border:"5px soild white"
}}/>

{/* now here passing some props value */}
<Profilecard heading={"Bio"}
text={user?.bio}/>

<Profilecard heading={"Username"}
text={user?.username} Icon={<Username/>}/>


<Profilecard heading={"name"}
text={user?.name} Icon={<Faceicon/>}/>




<Profilecard heading={"Joined"}
text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon/>}/>
{/* The function moment("2023-11-04T18:30:00.000Z").fromNow() is part of the Moment.js library, 
// which is used for handling and manipulating dates and times. */}
{/* .fromNow():

Computes the difference between the given date and the current time (moment(), which defaults to new Date()). */}
{/* and returns   human readable relative time */}

</Stack>
      {/* profile */}
     
    </div>
  )
}

const Profilecard=({heading ,Icon,text})=>  (
// This will now act as component to render
<Stack direction={"row"} alignItems={"center"} spacing={"1rem"} 
color={"white"}
textAlign={"center"}

>

{Icon &&Icon}

<Stack>
<Typography variant='body1'>{text}</Typography>
<Typography color={"gray"} variant="caption">

{heading}

</Typography>



</Stack>




</Stack>

)
   
export default Profile
