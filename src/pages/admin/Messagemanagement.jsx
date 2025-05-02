import Table from '../../components/shared/Table';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
// import Table from '../../components/shared/Table';
import { dashboardData } from '../../constants/sampledata';
import { fileformat, transformImage } from '../../lib/features';
import { Avatar, Box, Skeleton, Stack } from '@mui/material';
// import moment from 'moment';
import moment from 'moment';

import RenderAttachment from "../../components/shared/RenderAttachment"
import axios from 'axios';
import { useErrors } from '../../hooks/hook';
import { server } from '../../constants/config';
const colums=[{//it will be the columns of the TABLE
  field:"id", //here defining each column
  headerName:"ID",
  headerClassName:"table-header",
  width:200
  }
  ,{//it will be the columns of the TABLE
    field:"attachments", //here defining each column
    headerName:"Attachments",
    headerClassName:"table-header",
    width:200,
    // When renderCell: (params) => (...) is used, MUI 
    // automatically fills params with the cell-specific data of that particular row.
    renderCell:(params)=>{
    const {attachments} =params.row;
 
    return attachments?.length>0?attachments.map((i)=>{

      const url=i.url;
      const file=fileformat(url);
{/* <Avatar alt={i.name}
      // renderCell is a custom rendering function
      //  for a specific column in DataGrid.
    src={i.url}
    
    /> */}

    return (
      <Box>
        <a
        
        href={url}
        download
        target='_blank'
        style={{
          color:"black"
        }}
        >
          {RenderAttachment(file,url)}

        </a>
      </Box>
    )


    })  :"No attachments"


    // In MUI's DataGrid, params holds all relevant
    //  data for the specific cell of a particular row.
      // console.log(params); // Debugging: View params object in console
  
    
  
    }
    },{//it will be the columns of the TABLE
      field:"content", //here defining each column
      headerName:"Content",
      headerClassName:"table-header",
      width:400
      }
      ,{//it will be the columns of the TABLE
        field:"sender", //here defining each column
        headerName:"Sent By",
        headerClassName:"table-header",
        width:200,
        // When renderCell: (params) => (...) is used, MUI 
        // automatically fills params with the cell-specific data of that particular row.
        renderCell:(params)=>(
        
        // In MUI's DataGrid, params holds all relevant
        //  data for the specific cell of a particular row.
      //     console.log(params); // Debugging: View params object in console
      // console.log("hi");
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
    <Avatar alt={params.row.name}

          // renderCell is a custom rendering function
          //  for a specific column in DataGrid.
        src={params.row.avatar}
        
        />
        <span>{params.row.sender.name}</span>
      </Stack>
        
      
        )
        },{//it will be the columns of the TABLE
          field:"chat",    //here defining each column
          headerName:"chat",
          headerClassName:"table-header",
          width:220
          }

          // ,{//it will be the columns of the TABLE
          //   field:"groupchat", //here defining each column
          //   headerName:"Group chat",
          //   headerClassName:"table-header",//is used to apply a custom CSS class to the header of a specific column.
  
  
          //   width:100
          //   }
          , {
            field: "groupChat",
            headerName: "Group Chat",
            headerClassName: "table-header",
            width: 100,
          },


            ,{//it will be the columns of the TABLE
              field:"createdAt", //here defining each column
              headerName:"Time",
              headerClassName:"table-header",//is used to apply a custom CSS class to the header of a specific column.
    
    
              width:250
              }
  ];
const Messagemanagement = () => {
     const [rows, setrows] = useState([]);



     const [stats, setStats] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");
   
   
     useEffect(() => {
       const fetchStats = async () => {
         try {
           const { data } = await axios.get(`${server}/api/v1/admin/messages`, {
             withCredentials: true, // if you're using cookies/session
          
            });
            console.log(data)
           setStats(data);
    
         } catch (err) {
           setError(err.response?.data?.message || "Something went wrong");
         } finally {
           setLoading(false);
         }
       };
   
       fetchStats();
     }, []);
   
   console.log(stats)
   
     useErrors([
       {
         isError: error,
         error: error,
       },
     ]);
   



     
  useEffect(() => {
    if (stats) {
      setrows(
        stats.messages.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: transformImage(i.sender.avatar, 50),
          },
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [stats]);





//      useEffect(() => {
//       setrows(dashboardData.messages.map(i=>({
//      ...i,
// id:i._id,
// content:i.content.length==0?"No Message":i.content,
// sender:{
//   name:i.sender.name,
//   avatar:transformImage(i.sender.avatar,50),
// },
// createdAt:moment(i.createdAt).format("MMMM Do YYYY,h:mm:ss:a")// here just we are formating the date

//       }))); // Ensure this matches your actual data structure
//     }, []);
  return (
    <AdminLayout >
 {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Messages"} 
        rowHeight={200}
         colums={colums} rows={rows}/>
        
      )}

</AdminLayout>
  )
}

export default Messagemanagement

