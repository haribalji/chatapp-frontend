import React from 'react'
import Applayout from '../components/layout/Applayout';
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/Color';

const  Home=()=>{
  return(
    <Box bgcolor={grayColor} height={"100%"}>
          <Typography p={"2rem"} variant='h5' textAlign={"center"}>Select a friend to chat</Typography>

    </Box>
  )
    
}

export default Applayout()(Home);

// Now i am passing the Home component as the props to applayout function while exporting time then 
// that wrappedcompontent will be replaced by the home component
