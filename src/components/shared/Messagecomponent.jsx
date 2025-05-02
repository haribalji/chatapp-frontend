import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightblue } from '../../constants/Color';
import moment from 'moment';
import { fileformat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import { motion } from "framer-motion";

// it is the template of  displaying  the message
const Messagecomponent = ({message ,user}) => {
//  performing the deconstructor to extract the value from the props
const {sender,content,attachments=[],createdAt}=message;
const sameSender=sender?._id===user?._id;//if your sending message  to you itself
 const timeAgo=moment(createdAt).fromNow()
//  console.log(attachments)

  return (
    // this div is  for  displaying the message
    <motion.div
    // motion.div:
    // it is helpful in rendering the messages in from leftside
    initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
    style={{
      // your sending the message it will be displayed in the right side
      // if the opposite person sending the message it will be displayed in  left side
    alignSelf:sameSender?"flex-end":"flex-start",
    backgroundColor:"white",
    color:"black",
    borderRadius:"5px",
    padding:"0.5rem",
    width:"fit-content"
 }}

    >


      {
        // if the samesender not means we need to display the name of the sender
        !sameSender && <Typography color={lightblue} fontWeight={"600"} variant='caption'>{sender.name}</Typography>
      }
      {
// if the content is present means

content&& <Typography>{content}</Typography>


      }


      {/* here the attachment will be displayed */}

{

attachments.length>0 && attachments.map((attachement,index)=>{
// for identify each attachment unique and each attachement is a array
// first GET attachement FILE'S url
const url=attachement.url;
const file=fileformat(url);
return (
  <Box key={index}>
    <a
    href={url}
    target='_blank'
    download={url}
    style={{
      color:"black",
    }}  
    >
      
{RenderAttachment(file,url)} 



    </a>



  </Box>
)



})



}



        {/* it is used showing the timing of the message */}
      <Typography variant='caption' color="text.secondary">{timeAgo}</Typography>
      
      {/* hello message componetent */}
    </motion.div>
  )
}

export default memo(Messagecomponent)
