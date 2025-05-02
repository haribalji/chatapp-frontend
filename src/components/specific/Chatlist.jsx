import React from 'react'
import { Stack } from '@mui/material'
import Chatitem from '../shared/Chatitem'
import { bggradient } from '../../constants/Color'
const Chatlist=(
    {
        w="100%"
        ,
        chats=[],
        chatId,
        onlineUsers=[],
        newMessagesAlert=[//for tracking the new messages
    
    {
        // chatId:"",
        // count:0,


        chatId:"",
        count:0,


    }
    
    
        ],
        handleDeleteChat,
        
    }
    
    
    
    
    
    ) =>{
        console.log(chats)
        
        
        return (
      <Stack width={w} direction={"column"}
      
      overflow={"auto"}
      height={"100%"}

      >
    {/* here now we are displaying the chat data */}
    
    {chats.map((data,index)=>{
        // deconstruction from the data
        // console.log(data);
        // _id --> it is the chat id
        const {avatar,name,_id,groupChat,members}=data;
        const newMessageAlert=newMessagesAlert.find(({chatId})=>chatId===_id
        // if the  current chatid present in the newMessageAlert then we can say new message is arrived
        
        
        )
        //memebers-->other userid who connected with this chat
        const isOnline=members?.some((member)=> onlineUsers.includes(member));
//true if at least one member’s _id exists in the onlineUsers array.
// // false if none of the members are found in onlineUsers
        console.log(isOnline)
        return <Chatitem
        
        // now sending the data in component
        
        index={index}
        newMessagesAlert={newMessageAlert}
        isOnline={isOnline}
        avatar={avatar}
        name={name}
        _id={_id}
        key={_id}
        groupChat={groupChat}
        sameSender={chatId===_id}
        handleDeleteChat={handleDeleteChat}
        
        
        
        
        
        
        
        
        />
    })}
    
    
      </Stack>
      )
    }
    
export default Chatlist
 






