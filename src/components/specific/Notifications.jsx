

import React, {memo} from 'react'
import {Avatar, Button, Dialog, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemText, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { samplenotification } from '../../constants/sampledata'
import { AccessAlarm, Add  as AddIcon} from '@mui/icons-material'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc'

const  Notifications=() =>{
const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const {isLoading, data, isError, error}=useGetNotificationsQuery();

const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
      //   // accept it's value will be true or false

    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };


  
  const closeHandler = () => dispatch(setIsNotification(false));



  useErrors([{isError, error}]);//if any error is it's impact will be there
// console.log(data.allRequests)
  return(
     <Dialog open={isNotification} onClose={closeHandler}>
    <Stack P={{xs:"1rem" ,sm:"2rem"}} maxWidth={"25rem"} >
    <DialogTitle>Notifications</DialogTitle>

{

isLoading?<Skeleton/>:
<>

{
// samplenotification ka length is greater than 0 that time only we displaying the content
data?.allRequests.length>0?(


  data?.allRequests?.map((i)=><NotificationItem sender={i.sender} _id={i._id} key={i.id} handler={friendRequestHandler}/>)

):(<Typography textAlign={"center"}>0 notification</Typography>)


}
 

</>



}




    </Stack>
  </Dialog>
  )
}








const NotificationItem=memo(({sender,_id,handler})=>{
//  handler->friendRequesthanddler
const {name,avatar}=sender;
return (
  <ListItem >
<Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>

  {/* <Avatar src={avatar}/> image is there */}

  <Avatar /> 
  {/* {the avatar will be displayed without any image} */}
  <Typography     vsriant="body1" sx={{
 
      flexGlow:1,
      display:"-webkit-box",
      webkitLineClamp:1,
      webkitBoxOrient:"vertical",
      overflow:"hidden",
      textOverflow:"ellipsis",
      width:"100%"
  }}>
      {`${name}    ` }
  </Typography>

  </Stack> 
  <Stack
  
  direction={{xs:"column",
    sm:"row"
  }}
  
  
  >
    {/*  whether we are accepting the request or reject it
     */}
    <Button onClick={()=>handler({_id,accept:true})}>
      Accept
      </Button>
      <Button color="error" onClick={()=>handler({_id,accept:false})} >Reject</Button>
  </Stack>
  
  
  </ListItem>
)
});













export default Notifications
