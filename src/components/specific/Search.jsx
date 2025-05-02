import {Dialog, DialogTitle, InputAdornment, List, ListItemText, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useInputValidation } from '6pp'
import {Search as SearchIcon} from '@mui/icons-material'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constants/sampledata'
import { setIsSearch } from '../../redux/reducers/misc'
import { useDispatch, useSelector } from 'react-redux'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api'
import { useAsyncMutation } from "../../hooks/hook";

const Search=()=> {
  const { isSearch} = useSelector(
    (state) => state.misc
);
const dispatch = useDispatch();

const searchCloseHandler = () => dispatch(setIsSearch(false));

const [searchUser] =useLazySearchUserQuery();//externaly we need to trigger this function for execution
// useLazySearchUserQuery() returns a trigger function (here named searchUser) that you can call manually when needed.
// You are calling searchUser(search.value), so you're passing search.value as the argument to the query.


const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
  useSendFriendRequestMutation
);


// work flow here it is explained 
// You are passing the mutation hook useSendFriendRequestMutation into useAsyncMutation. which will be called 
// which returns an array:
// return [executeMutation, isLoading, data];

// sendFriendRequest	→ The executeMutation function returned from useAsyncMutation — 
// this is what you manually call to trigger the mutation
// isLoadingSendFriendRequest	→ Tells you whether the request is in progress
// dataSendFriendRequest	→ Contains the response from the mutation (if successful) which your not hold here

// then only 
// Here you're triggering the executeMutation (aliased as sendFriendRequest) function.

// Inside executeMutation(...): function 
// toastMessage = "Sending friend request..."

// ...args = [{ userId: id }] ← You pass the payload like this.

const search=useInputValidation("")

const addFriendHandler = async (id) => {
  // to who we are sending the request there ones we send
  await sendFriendRequest("Sending friend request...", { userId: id });
};


// let isLoadingSendFriendRequest=false;
const [users, setusers] = useState([])


useEffect(() => {
  const timeOutId = setTimeout(() => {
    searchUser(search.value)
      .then(({ data }) => setusers(data.users))
        // console.log(data))
        
      .catch((e) => console.log(e));
  }, 1000);

  return () => {
    // if the input changes before the 1 second is up, 
    // the previous setTimeout is cleared, and a new one is set.
    // This prevents multiple searchuser calls.
    clearTimeout(timeOutId);
  };
}, [search.value]); //if search value changes then it need to be executed

  return <Dialog open={isSearch}
   onClose={searchCloseHandler}//if the user clicking outside the compontent
  //  this onclose function will trigger and close the search modal
  
  >
{/*     


//   It wraps everything, meaning this UI is inside a modal.
// Typically, Dialog is used to display popups in Material-UI. */}
    <Stack p={"2rem"} direction={"column"} width={"25rem"}>
      <DialogTitle textAlign={"center"} > Find people</DialogTitle>
      <TextField label="" value={(search.value)}  onChange={search.changeHandler}
      variant="outlined"
      size="size"
      InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>


          )
      }}
      
      />

<List>
  {
    // const users = [
    //   { _id: "123", name: "Alice" },
    //   { _id: "456", name: "Bob" },
    //   { _id: "789", name: "Charlie" }
    // ];
    // i._id refers to the unique identifier (_id) of each user object (i) in the users array. 
    // For the first iteration: i._id is "123".
    // i._id is a way to access the unique ID of each object while iterating over the users array. However, it is not specifically tied
    //  to the 0th index—it works for all indices in the array.
    users.map((i)=>(
     <UserItem user={i} key={i._id} handler={addFriendHandler}
     handlerIsLoading={isLoadingSendFriendRequest}/>
    )) 
  }

</List>


    </Stack>
  </Dialog>
}

export default Search
