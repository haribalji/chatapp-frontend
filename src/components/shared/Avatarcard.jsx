import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'
import {transformImage} from"../../lib/features"
// here we setting the max=4 maximum 4 avatar's will be displayed
const Avatarcard = ({avatar=[],max=4}) => {
  return(
  <Stack direction={"row"} spacing={0.5}>
    <AvatarGroup max={max}
    
sx={{
    position:"relative",
    
}}    
    
    
    
    >
        <Box width={"3rem"} height={"3rem"}>
        
        {
            // i represents each item in the avatar array.
            // index represents the position of that item in the array. like  0th index or 1st index
            
            avatar.map((i,index)=>(
                <Avatar key={Math.random()*100} src={transformImage(i)} alt={`Avatar ${index}`}
                sx={{
                    width:"3rem",
                    height:"3rem",
                     position:"absolute",
left:{
    xs:`${0.5+index}rem`,
    sm:`${index}rem`
}
                }}
                />
            )
        )
        }
        </Box>
    </AvatarGroup>
    
  </Stack>
  )
}

export default Avatarcard
