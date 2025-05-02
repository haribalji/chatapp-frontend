import React ,{memo} from 'react'
import { Link } from '../styles/StyledComponents'
import { Stack, Typography ,Box} from '@mui/material'
import Avatarcard from './Avatarcard'
import { motion } from "framer-motion";

// chat item will ordered here
const Chatitem=({
avatar=[],
name,
_id,
groupChat=false,//by default
sameSender,
isOnline,
newMessagesAlert,
index=0,
handleDeleteChat,


})=> {
  return (
   

  <Link
  sx={{
    padding:"0"
  }}
   to={`/chat/${_id}`}
  
  onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}
  // onContextMenu is an event handler in React (and JavaScript) 
  // that fires when the right-click context menu is triggered on an element.
  >
<motion.div 
  // motion.div:
    // it is helpful in rendering the messages in from leftside
    initial={{ opacity: 0, y: "-100%" }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
 
 
    style={{

display:"flex",
gap:"1rem",
alignItems:"center",
// padding:"1rem",
backgroundColor:sameSender? "black":"unset",
color:sameSender?"white":"unset",
position:"relative",
padding: "1rem",

}}>

{/* {avatar card here will be displayed} */}

<Avatarcard avatar={avatar}/>

<Stack>
<Typography>
  {name}
</Typography>
{
  newMessagesAlert&&(
    // here if the new message is avaiable then it need to be indicated
    <Typography>
      {newMessagesAlert.count} New Message
    </Typography>
  )
}


</Stack>

{/* if the user is in the online then it need to be  indicated in the green color*/}

{
  isOnline&&(


    <Box sx={{
      width:"10px",
      height:"10px",
      borderRadius:"50%",
      backgroundColor:"green",
      position:"absolute",
      top:"50%",
      right:"1rem",
      transform:"translateY( 50%)",
    }}/>
  )





}









</motion.div>

  </Link>
  )
}

export default memo(Chatitem)
// memo is a higher-order component (HOC) from React (React.memo).
// It optimizes performance by preventing unnecessary re-renders.
// It only re-renders the ChatItem component when its props change.
// If ChatItem receives the same props as before, it won’t re-render.
