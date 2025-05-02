import React from 'react'
import {Avatar, Button, Dialog, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemText, Skeleton, Stack, TextField, Typography } from '@mui/material'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constants/sampledata'
import { useInputValidation } from '6pp'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { useAsyncMutation,
   useErrors } from "../../hooks/hook";
import { setIsNewGroup } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'

const  Newgroup=()=> {
  
// const [members, setmembers] = useState(sampleUsers);
const [selectedmembers, setselectedmembers] = useState([])

const dispatch = useDispatch();
const { isNewGroup } = useSelector((state) => state.misc);

const { isError, isLoading, error, data } = useAvailableFriendsQuery();
const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);


const groupName=useInputValidation("")




  
  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const submitHandler=()=>{
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedmembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedmembers,
    });

    closeHandler();




  }
  const selectMemberHandler=(id)=>{
    console.log("selected member group is opened");

  


    // yet now previous selected members and  add current members also in it
    // if the id is already is includesd then remove that id as they don't need that id
    // if the  currentelement!==id that element we considred by appling the filter in prev existing elements
    setselectedmembers(prev=>prev.includes(id)?prev.filter((currentelement)=>currentelement!==id):[...prev,id]);
  }

  console.log(selectedmembers);

const closeHandler=()=>{
  dispatch(setIsNewGroup(false));

}

  return (
    <Dialog  onClose={closeHandler}  open={isNewGroup}>
    <Stack p={{xs:"1rem" ,sm:"3rem"}} width={"25rem"}  spacing={"2rem"}>
    <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>
<TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
<Typography variant='body1'>
  Members
</Typography>
<Stack >
   {isLoading?(<Skeleton/> ): (data?.friends?.map((i)=>(
       <UserItem user={i} key={i._id} handler={selectMemberHandler}
      //  from the selected members if this id is matching then send the isadded=true other wise false\
      isAdded={selectedmembers.includes(i._id)}

/>
      ))
    )
      
      
      }
</Stack>
<Stack direction={"row"} justifyContent={"space-evenly"}>
  <Button variant='text' color="error" size="large"
      onClick={closeHandler}

  >
    Cancel
  </Button>
  <Button variant='contained' onClick={submitHandler} disabled={isLoadingNewGroup}>
    Create
  </Button>

</Stack>

    </Stack>
  </Dialog>
  )
}

export default Newgroup
