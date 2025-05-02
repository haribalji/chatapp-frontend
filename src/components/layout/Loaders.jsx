import { Grid ,Skeleton, Stack} from '@mui/material'
import React from 'react'
import { BouncingSkeleton } from '../styles/StyledComponents';



// In React, a skeleton refers to a
//  placeholder UI that mimics the structure of the final content 
//  while data is still being fetched. Instead of showing a blank screen or
 
//  a loading spinner, skeleton screens display grey blocks or lines where text,
//   images, or components will eventually load. This technique enhances the user
//    experience by making the application feel faster and more responsive.









  const LayoutLoader=()=>{
    return <Grid container sx={{ height: "calc(100vh - 4rem)" }}  spacing={"1rem"}>
    <Grid
      item
      sm={4}
      md={3}
      sx={{
        display: { xs: "none", sm: "block" },
        height: "100vh",  // Ensure full height
        // bgcolor: "primary.main",
      }}
    >
            <Skeleton variant='rectangular' height={"100vh"}/>
            </Grid>
    
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      lg={6}
      sx={{ height: "100%" }} // Ensure it inherits from the container
    >
        <Stack spacing={"1rem"}>
            <Skeleton variant='rectangular' height={"5rem"}/>
            <Skeleton variant='rectangular' height={"5rem"}/>
            <Skeleton variant='rectangular' height={"5rem"}/>
            <Skeleton variant='rectangular' height={"5rem"}/>
            <Skeleton variant='rectangular' height={"5rem"}/>
            <Skeleton variant='rectangular' height={"5rem"}/>
            <Skeleton variant='rectangular' height={"5rem"}/>
            <Skeleton variant='rectangular' height={"5rem"}/>
            <Skeleton variant='rectangular' height={"5rem"}/>

            </Stack>
            </Grid>
    
    <Grid
      item
      md={4}
      lg={3}
      sx={{
        display: { xs: "none", md: "block" },
        // padding: "2rem",
        // bgcolor: "rgba(0,0,0,0.85)",
        height: "100vh", // Ensure full height
      }}
    >
            <Skeleton variant='rectangular' height={"100vh"}/>

    </Grid>
  </Grid>
  

}



const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};


export { TypingLoader, LayoutLoader };