import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampledata'
import UserItem from "../shared/UserItem"
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'

const AddmemberDialog = ({chatId}) => {
  const dispatch = useDispatch();

  const [members, setmembers] = useState(sampleUsers);
  const [selectedMembers, setselectedMembers] = useState([])
  

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

    const { isAddMember } = useSelector((state) => state.misc);
  
    const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);//here
    // we are collecting all the members who is not part of this group and friend to this creator

  const selectMemberHandler=(id)=>{
    console.log("selected member group is opened");
    // yet now previous selected members and  add current members also in it
    // if the id is already is includesd then remove that id as they don't need that id
    // if the  currentelement!==id that element we considred by appling the filter in prev existing elements
    // setselectedMembers(prev=>prev.includes(id)?prev.filter((currentelement)=>currentelement!==id):[...prev,id]);
  
    setselectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
    // console.log(selectedMembers)

  
  }

  // console.log(members)

  const addMemberSubmitHandler=()=>{
    console.log(selectedMembers)
    console.log("addMemberSubmitHandler")
    addMembers("Adding Members...", { members: selectedMembers, chatId });

    closeHandler();
  }

  const closeHandler=()=>{
    // setselectedMembers([]);
    // setmembers([]);
    // console.log("closeHandler");
    dispatch(setIsAddMember(false));
  }

  useErrors([{ isError, error }]);


  
  return <Dialog open={isAddMember} onClose={closeHandler}>


<Stack p={"2rem"} width={"20rem"}spacing={"2rem"}>
  <DialogTitle textAlign={"center"}>Add Member</DialogTitle>





<Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>



<Stack direction={"row"} alignItems={"center"}  justifyContent={"space-evenly"}>
<Button color='error' onClick={closeHandler}>
  Cancel
</Button>

<Button  onClick={addMemberSubmitHandler}     variant='contained' disabled={isLoadingAddMembers}>
Submit changes

</Button>
</Stack>

</Stack>

  </Dialog>
}

export default AddmemberDialog
