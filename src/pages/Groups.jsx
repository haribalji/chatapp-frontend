import React, { lazy, memo, Suspense, useEffect } from 'react'
    import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Skeleton, Stack, TextField, Tooltip, Typography} from '@mui/material'
    import {bggradient, matBlack, orange} from "../constants/Color"//color will be present here only
import AvatarCard from "../components/shared/Avatarcard"
import {Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon,} from '@mui/icons-material';
import { Navigate, useNavigate ,useSearchParams} from 'react-router-dom';
import { useState } from 'react';
import {Link}from "../components/styles/StyledComponents"
import {samplechats, sampleUsers} from "../constants/sampledata"
import UserItem from '../components/shared/UserItem';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { LayoutLoader } from "../components/layout/Loaders";

import { 
  useAsyncMutation,
  // useAsyncMutation,
   useErrors } from "../hooks/hook";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc';

const ConfirmDeleteDialog=lazy(()=>import("../components/dialogs/ConfirmDeleteDialog"))

const AddmemberDialog=lazy(()=>import("../components/dialogs/AddmemberDialog"))



// const isAddMember =false;//by default
const Groups = () => {
  const chatId=useSearchParams()[0].get("group");//to track the exact the id of that paritcular group 
  const myGroups = useMyGroupsQuery("");//it will called automatically and give the  groups which is created by me
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
// console.log(groupDetails)
// const navigate = useNavigate();

  // console.log(myGroups)
  const updateGroupName=()=>{
    console.log("groupname updation takes place");
    setIsEdit(false);


    updateGroup("Updating Group Name...", {
      chatId,
      name: groupnameupdatedvalue,
    });
    // here it will print the updated value
    console.log(groupnameupdatedvalue)
  }
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);


  const [isEdit,setIsEdit]=useState(false);

// here we get group name
const [groupname,setgroupname]=useState("");
const [groupnameupdatedvalue,setgroupnameupdatedvalue]=useState("");
const [confirmDeleteDialog,setConfirmDeleteDialog]=useState(false);
const [members, setMembers] = useState([]);

const [updateGroup, isLoadingGroupName] = useAsyncMutation(
  useRenameGroupMutation
);

const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
  useRemoveGroupMemberMutation
);

const errors = [
  {
    isError: myGroups.isError,
    error: myGroups.error,
  },
  {
    isError: groupDetails.isError,
    error: groupDetails.error,
  },
];

useErrors(errors);
useEffect(() => {
  const groupData = groupDetails.data;
  if (groupData) {//if this groupDetails value exisit then only it will be exisits
    setgroupname(groupData.chat.name);
    setgroupnameupdatedvalue(groupData.chat.name);
    setMembers(groupData.chat.members);
  }

  return () => {
    setgroupname("");
    setgroupnameupdatedvalue("");
    setMembers([]);
    setIsEdit(false);
  };
}, [groupDetails.data]);


const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
  useDeleteChatMutation

);

// for adding and deleting the member we created the handler for that
const openAddMemberHandler=()=>{
  console.log("add memeber");
  dispatch(setIsAddMember(true));

}
const openconfirmDeleteHandler=()=>{
  setConfirmDeleteDialog(true);
  console.log("delete group");
}
const closeconfirmDeleteHandler=()=>{

  setConfirmDeleteDialog(false);

}
const deleteHandler=()=>{
  console.log("delete handler");
  deleteGroup("Deleting Group...", chatId);

  closeconfirmDeleteHandler();
  // after deletion just navigate
  navigate("/groups");

}

const removeMemberHandler=(userId)=>{
  console.log("removeMemberHandler",userId);
  removeMember("Removing Member...", { chatId, userId });

}

useEffect(()=>{
  if(chatId){
// if the user selected the group id then it will be visible 
  // setgroupname(`group name ${chatId}`);
  // setgroupnameupdatedvalue(`group name${chatId}`);
}





  return ()=>{
    // first it will be executed then only the above value will be seted
    setgroupname("");
    setgroupnameupdatedvalue("");
    setIsEdit(false)//this is to come out from the textfield when switching 
    // from chat to another chat
  }
},[chatId])

// here ButtonGroup defintion will be there

const ButtonGroup=<Stack


direction={{
    xs:"column-reverse",
  sm:"row",

}}
spacing={"1rem"}
p={{
xs:"0",//extra smaller screen mobile
sm:"1rem",//smaller scrren tablets
md:"1rem 4rem",//screen with medium and above desktop
}}
>
  <Button size='large' color="error"
  
  startIcon={<DeleteIcon/>}//this the says icon will be inside button itself which is mentioned in this feild
  onClick={openconfirmDeleteHandler}
  
  
  >Delete Group</Button>
  <Button size='large' variant='contained'
  
  startIcon={<AddIcon/>}//this the says icon will be inside button itself which is mentioned in this feild
  onClick={openAddMemberHandler}

  
  >Add Member</Button>


</Stack>





  const GroupName=<Stack
  
  direction={"row"}
  alignItems={"center"}
  justifyContent={"center"}
  spacing={"1rem"}
  
  padding={"3rem"}
  >
    {


isEdit?(
  <>
  
  {/* when the user click the edit button then this down content will be visible*/}
  <TextField value={groupnameupdatedvalue}
  
  onChange={(e)=>setgroupnameupdatedvalue(e.target.value)}

  />
  <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}
  >
    <DoneIcon/>
  </IconButton>
  
  </>
):(
<>
<Typography variant='h4' >{groupname}</Typography>
<IconButton onClick={()=>setIsEdit(true)}
  
  disabled={isLoadingGroupName}
  
  >
<EditIcon/>
</IconButton>
</>



)


    }
  </Stack>


// console.log(chatId)
const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
// const [isEdit,setIsEdit]=useState(false);



 const navigate=useNavigate();

const handlemobile=()=>{
  console.log("handle  mobile open ");
  setIsMobileMenuOpen((prev)=>!prev);
}
const handleMobileClose=()=>{
  console.log("handle  mobile close ");
  setIsMobileMenuOpen(false);
}



  const NavigateBack=()=>{
    console.log("moving back")
    navigate("/")
  }
const IconBtns=<>
<Box


sx={{
  display:{
  xs:"block",
  sm:"none",//if the screen is big it won't visible
  position:"fixed",
  right:"1rem",
  top:"1rem"
  }

}}
  

>
<IconButton onClick={handlemobile} >
  <MenuIcon/>
</IconButton>

</Box>





{/* here the back button will be there */}
<Tooltip title="back"   >
<IconButton 

sx={{
  position:"absolute",
  top:"2rem",
  left:"2rem",

bgcolor:matBlack,
color:"white",
":hover":{
  bgcolor:"rgba(0,0,0,0.7)"
}
}}


onClick={NavigateBack}
>
  <KeyboardBackspaceIcon/>
</IconButton>
</Tooltip>
</>
  return myGroups.isLoading?<LayoutLoader/> :
  (<Grid container height={"100vh"}>
<Grid item 
sx={{
    display:{
        xs:"none",
        sm:"block"
    },
}}
sm={4}

>
Group List
<GroupsList myGroups={myGroups?.data?.groups} chatId={chatId}/>
</Grid>



<Grid item xs={12} 
  sm={8}
  sx={{
    display:"flex",
    flexDirection:"column",
    padding:"1rem 3rem",
     alignItems:"center",
     position:"relative",

}}>
    {/* GO to details */}


 
    {IconBtns}
    {
       groupname&&   <>
       
       
       
       
       
       
       
       
       
       {GroupName}
      <Typography
      margin={"2rem"} 
      alignSelf={"flex-start"}
      variant='body1'
      
      >
        
        members
        </Typography> 



        <Stack
        
        maxWidth={"45rem"}
        width={"100%"}
        boxSizing={"border-box"}
        padding={{
 sm:"1rem",
 xs:"0",
 md:"1rem 4rem"



        }}
      spacing={"2rem"}
      // bgcolor={"bisque"}
      height={"50vh"}
      overflow={"auto"}  >


{/* {members} */}


{
isLoadingRemoveMember?<CircularProgress/>
:

members.map((i)=>(
  // those user who already in the group
  <UserItem user={i} isAdded
  key={i._id}
  styling={{

boxShadow:"0 0 0.5rem  rgba(0,0,0,0.2)",
padding:"1rem 2rem"
,
borderRadius:"1rem",

  }}
  
  // here we will pass the function that will remove the members from the
  // the class
  handler={removeMemberHandler}
  
  />
))}

</Stack>
       
       
       
       {ButtonGroup}
       
       
       </>
    }

</Grid>






{
isAddMember&&


<Suspense fallback={<Backdrop open/>}> {/* It waits for child components to load before rendering them. It displays 
  the fallback component while the child is loading.*/}
<AddmemberDialog chatId={chatId}/>
    
  </Suspense>


}









{

confirmDeleteDialog &&<>
(

  {/* When open={confirmDeleteDialog} is true

The dialog appears, prompting the user for confirmation.
When handleClose={closeconfirmDeleteHandler} is triggered

The dialog closes when the user cancels or confirms the action.
closeconfirmDeleteHandler should update the state (confirmDeleteDialog) to false. */}


  <Suspense fallback={<Backdrop open/>}> {/* It waits for child components to load before rendering them. It displays 
  the fallback component while the child is loading.*/}
    <ConfirmDeleteDialog open={confirmDeleteDialog}
    handleClose={closeconfirmDeleteHandler}
    deleteHandler={deleteHandler}
    
    />
  </Suspense>
)
df
</>

}


<Drawer

sx={{
  display:{
    xs:"block",
    sm:"none",
  }  
  ,
}}


open={isMobileMenuOpen} onClose={handleMobileClose}>


{/* <GroupsList/> */}
<GroupsList   w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId}



/>


{/* Hari balaji H group list */}
</Drawer>


  </Grid>
  )
}

const GroupsList=({w="100%",myGroups=[],chatId})=>(
  <Stack width={w}
  
  sx={
    {
      backgroundImage:bggradient,
      height:"100vh",
      overflow:"auto"

    }
  }
  
  
  >
{ myGroups.length>0?  myGroups.map((group)=>

// here the group item component will be returned
<GroupsListItem group={group} key={group._id} chatId={chatId}/>
) :(
  <Typography textAlign={"center"} padding={"1rem"}>
{/*   IF NO group is exisits then we can say */}

No Group
  </Typography>)
}
  </Stack>
)
;

const GroupsListItem=memo(({group,chatId})=>{
// deconstructor is performed
const{
  name,
  avatar, _id//THIS ID IS THE INDIVIDUAL OF THE USER PRESENT IN THE GROUP
  // ,chatId//this chatID IS THAT GROUP ID
} =group



return (<Link to={`?group=${_id}`} 
// this particular group id data will be render
  onClick={(e)=>{
// when again and again clicking the same group rendendering can be avoided
    if(chatId===_id) e.preventDefault()
  }}

>
<Stack direction={"row"} spacing={"1rem"}  alignItems={"center"}>
  <AvatarCard avatar={avatar}/>
<Typography textAlign={"center"}>
{name}
</Typography >



</Stack>


</Link>)

});




export default Groups
