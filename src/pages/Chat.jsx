import React, { Fragment, useCallback, useEffect, useState } from 'react'
import Applayout from '../components/layout/Applayout';
import { useRef } from 'react';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { grayColor, orange } from '../constants/Color';
import { AttachFile as AttachFileIcon , Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import Filemenu from '../components/dialogs/Filemenu';
import { useDispatch } from "react-redux";

// import { sampleMessage } from '../constants/sampledata';
import Messagecomponent from '../components/shared/Messagecomponent';
import { getSocket } from '../socket';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useChatDetailsQuery, useDeleteChatMutation, useGetMessagesQuery } from '../redux/api/api';
import { useAsyncMutation, useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from '../redux/reducers/misc';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { TypingLoader } from '../components/layout/Loaders';
import { Navigate, useNavigate } from 'react-router-dom';

const  Chat=({ chatId,
  user
  // ,members
})=> {

// user  format data
  
// {avatar: {…}, _id: '6810cd9567de743df77a3cc5', name: 'sugun', bio: 'civil', username: 'nvp', …}
// avatar
// : 
// {public_id: '62831f10-15f5-4fa1-a99b-5c94e667d973', url: 'https://res.cloudinary.com/dbfyjehcn/image/upload/…45931668/62831f10-15f5-4fa1-a99b-5c94e667d973.jpg'}
// bio
// : 
// "civil"
// isAdmin
// : 
// "true"
// name
// : 
// "sugun"
// updatedAt
// : 
// "2025-04-29T13:01:09.633Z"
// username
// : 
// "nvp"
// __v
// : 
// 0
// _id
// : 
// "6810cd9567de743df77a3cc5"
  // console.log(user)
// const user={
//   _id:"hari",
//   name:"hari balaji"
// }
const containerRef=useRef(null);
const bottomRef = useRef(null);

const dispatch = useDispatch();
const navigate=useNavigate()
const [page, setPage] = useState(1);
const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
const [userTyping, setUserTyping] = useState(false);
const [IamTyping, setIamTyping] = useState(false); 
 const typingTimeout = useRef(null);


const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
// skip: !chatId if the chatid is exisits then it will trigger
// otherwise it will not trigger this function
  
console.log(user)

useEffect(() => {
  // if any error occured it navigate to home page
  // if that particular chat is never exists that time error can come
  if (chatDetails.isError) return navigate("/");
}, [chatDetails.isError]);

const  members=chatDetails?.data?.chat?.members;

// console.log(chatDetails
//   // ?.data?.chat
// )
const oldMessagesChunk = useGetMessagesQuery({ chatId, page:page });
// console.log(oldMessagesChunk?.data?.messages)
// console.log( oldMessagesChunk.data?.totalPages)

const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
  // data: oldMessages → means take the data returned from useInfiniteScrollTop, 
  // and rename it as oldMessages.

  // setData: setOldMessages → means take the setData function from useInfiniteScrollTop, 
  // and rename it as setOldMessages.
 
 
  containerRef,
  oldMessagesChunk.data?.totalPages,//tol page exisits in the db
  page,
  setPage,
  oldMessagesChunk.data?.messages//new messages

//   setData is used inside useInfiniteScrollTop to append new and old messages together.

// setData updates the existing messages list.

// It combines (append) new messages and old messages.

// After updating, it returns the latest data back to you (oldMessages).
);



// you gave ref={containerRef} to the <Stack>.

// Inside your useInfiniteScrollTop, you're watching containerRef.current.scrollTop.

// When user scrolls to top (scrollTop = 0):

// The hook calls setPage(prev => prev + 1)

// page increases

// You fetch more old messages from the server using the new page

// Then oldMessagesChunk.data.messages updates and renders more <Messagecomponent /> in the UI.



const errors=[{
  isError:chatDetails.isError,
  error:chatDetails.error
},

{
  isError:oldMessagesChunk.isError,
  error:oldMessagesChunk.error
},
]; 


const socket=getSocket();
// console.log(socket) 
const submitHandler = (e) => {
  e.preventDefault();

  if (!message.trim()) return;//message.trim() removes any leading or trailing spaces from the string.
  console.log("holleddd")

  // Emitting the message to the server
  // in server side the message will be created and sent to id


  socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
};

// switching from one chat to another chat we need   to
// display the  corresponding chat messages only 
// by tracking the chatid if chatid changes then this below useffect will be 
// executing 
useEffect(() => {
  socket.emit(CHAT_JOINED, { userId: user._id, members });
//user--> came from applayout from store 

  // if chatid changes that time useeffect will be run 
  // then current chat id new  messsages alert count will   removed 
  dispatch(removeNewMessagesAlert(chatId));



  return () => {
    // puting inside the clean-up function
    setMessages([]);
    setMessage("");
    setOldMessages([]);
    setPage(1);
    socket.emit(CHAT_LEAVED, { userId: user._id, members });
  };
}, [chatId]);


const newMessagesListener = useCallback(
  // useCallback is used to memoize (remember) a function so that 
  // it doesn't get recreated on every render.
  (data) => {

    // console.log(data);
    // inside the data we receive chatid to whom we need to send the data there chat id will be displayed 
    // if they map then only adding there data
    if (data.chatId !== chatId) return;
   
   
  //  sample format
    // {chatId: '6810d78db2f0c770cfaf5190', message: {…}}
    // chatId
    // : 
    // "6810d78db2f0c770cfaf5190"
    // message
    // : 
    // {content: 'jkds', _id: 'f433e069-98dd-405c-a1ea-0fb794da33b3', sender: {…}, chat: '6810d78db2f0c770cfaf5190', createdAt: '2025-04-29T13:52:50.648Z'}
    // [[Prototype]]
    
  // }



    setMessages((prev) => [...prev, data.message]);
    //adding with the previous array mesagess
    // it blindly adds data.message to your messages array, 
    // no matter what the structure of data.message is.
  },
  [chatId]
);


const startTypingListener = useCallback(
  (data) => {
    // if different chatid the event is triggreed then it should not execute
    // data.chatId !== chatId
    if (data.chatId !== chatId) return;

    setUserTyping(true);
  },
  [chatId]
);
const stopTypingListener = useCallback(
  (data) => {
        // if different chatid the event is triggreed then it should not execute
    // data.chatId !== chatId
    if (data.chatId !== chatId) return;
    setUserTyping(false);
  },
  [chatId]
);

const alertListener = useCallback(
//if any messages is coming from the admin then it will be
//executed to display this messages
  (data) => {
    // both chat id should same  then only  allowing  message  to display in the  chat
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      sender: {
        _id: "anything",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, messageForAlert]);
  },
  [chatId]
);

const eventHandler = {
  [ALERT]: alertListener,
  [NEW_MESSAGE]: newMessagesListener,
  [START_TYPING]: startTypingListener,
  [STOP_TYPING]: stopTypingListener,
};
useSocketEvents(socket, eventHandler);



useErrors(errors)



useEffect(() => {
  if (bottomRef.current)
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
}, [messages]);//if new messagess coming then it will automatically come down


// it will be called when something typed in the input field
const messageOnChange = (e) => {
  setMessage(e.target);
  setMessage(e.target.value);

  if (!IamTyping) {
    // if firsttime  typing  it will be executed
    socket.emit(START_TYPING, { members, chatId });
    setIamTyping(true);
  }
// whenever typing is taking place it will be executed 
// it  stopping the previous scheduled execution.

// typingTimeout.current  here any timeoutid exists then timeout is runing so
//  we are  stopping the previous scheduled execution.
if (typingTimeout.current) clearTimeout(typingTimeout.current);

  typingTimeout.current = setTimeout(() => {//it will return the id  which will be stored by typingTimeout.current
socket.emit(STOP_TYPING, { members, chatId });
// till this many second the typing didn't take place 
// then the typing event will be stoped if we didn't typed this many seconds
    setIamTyping(false);
  }, [2000]);
};



  // const  fileMenuRef=useRef(null);
  // useRef is a React Hook that stores a value without causing re-renders. It gives you a
  //  reference (ref) that stays the same between renders.
 
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

const allMessages = [...oldMessages,...messages]
//with the old messages i am adding the new received socket messages


// console.log(allMessages)

return chatDetails.isLoading?(<Skeleton/>):(
    <Fragment>
      <Stack ref={containerRef}//So useInfiniteScrollTop will listen to this <Stack> scrolling.


      boxSizing={"border-box"}
      padding={"1rem"}
      spacing={"1rem"}
      bgcolor={grayColor}
      height={"90%"}
      sx={{
        overflowX:"hidden"
        ,overflowY:"auto",
      }}
      >
        {/* {Message here only render} */}

     
{allMessages.map((i)=>(
  <Messagecomponent key={i._id}message={i} user={user}/>



))}


{userTyping && <TypingLoader />}

<div 
// it is always poniting to the bottom layer
ref={bottomRef} 
/>
        
      </Stack>

<form
style={{height:"10%"}}
onSubmit={submitHandler}



>
<Stack direction={"row"} height={"100%"}
padding={"1rem"}
alignItems={"center"}
position={"relative"}

>
  <IconButton sx={{
    position:"absolute",
    left:"1.5rem",
    rotate:"30deg "
  }}
  // ref={fileMenuRef}
  onClick={handleFileOpen}

  >
    <AttachFileIcon/>
  </IconButton>
<InputBox placeholder='Type Message Here...'  
value={message}
onChange={messageOnChange}

/>
<IconButton type='submit'
sx={{
  rotate:"-30deg",
  bgcolor:orange,
  color:'white',
  marginLeft:"1rem",
  padding:"0.5",
  "&:hover":{
    bgcolor:"error.dark"
  }
}}

>
  <SendIcon/>
</IconButton>


</Stack>

.

</form>
<Filemenu anchorE1={fileMenuAnchor} chatId={chatId} />

{/* <Filemenu
//  anchorEl={fileMenuRef.current}
/> */}

    </Fragment>
  )
}

export default Applayout()(Chat);

// export default 
// Now i am passing the Home component as the props to applayout function while exporting time then 
// that wrappedcompontent will be replaced by the home component
