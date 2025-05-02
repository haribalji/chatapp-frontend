// Here this compound is used to give structure of user in search bar list

import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, {memo} from 'react'
import { Add  as AddIcon, Remove as RemoveIcon} from '@mui/icons-material'
import { transformImage } from '../../lib/features'
const UserItem = ({user,handler,handlerIsLoading,isAdded=false,styling={

}}) => {
    const {name,_id,avatar}=user
// console.log(avatar)
    
  return (
    <ListItem sx={{}}>
<Stack direction={"row"} alignItems={"center"} spacing={"1rem"} 
{...styling}//it will apply the coming style in the stack


width={"100%"}>

    {/* <Avatar src={transformImage(avatar)}/> */}
    <Avatar src={transformImage(avatar[0])} />


    <Typography     vsriant="body1" sx={{
   
        flexGlow:1,
        display:"-webkit-box",
        webkitLineClamp:1,
        webkitBoxOrient:"vertical",
        overflow:"hidden",
        textOverflow:"ellipsis",
        width:"100%",
        
    }}>
        {name}
    </Typography>
    <IconButton 
    
    size="small"
    sx={{
        bgcolor: isAdded?"error.main":"primary.main",
        color:"white",
        "&:hover":{
            bgcolor:isAdded?"error.dark":"primary.dark", 
        }

    }}
    
    
    
    onClick={()=>handler(_id)} disabled={handlerIsLoading}>
        {isAdded?<RemoveIcon/>:<AddIcon/>}



    </IconButton>
    </Stack> 
    
    
    
    </ListItem>
  )
}

export default memo(UserItem)
