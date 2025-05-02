import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table';
import { dashboardData } from '../../constants/sampledata';
import { transformImage } from '../../lib/features';
import { Avatar, Skeleton, Stack } from '@mui/material';
// import AvatarCard from "../../components/shared/Avatarcard"
import Avatarcard from '../../components/shared/Avatarcard';
import { server } from '../../constants/config';
import axios from 'axios';
import { useErrors } from "../../hooks/hook.js";

// D:\web project\chatapp\npx create-vite@5.2.0 my-vite-app --template react\src\components\shared\Table.jsx

const colums=[{//it will be the columns of the TABLE
field:"id", //here defining each column
headerName:"ID",
headerClassName:"table-header",
width:200
}
,{//it will be the columns of the TABLE
  field:"avatar", //here defining each column
  headerName:"Avatar",
  headerClassName:"table-header",
  width:150,
  // When renderCell: (params) => (...) is used, MUI 
  // automatically fills params with the cell-specific data of that particular row.
  renderCell:(params)=>{
    // console.log(params.row.avatar);
   return  <Avatarcard avatar={params.row.avatar}/>
  }


},{//it will be the columns of the TABLE
    field:"name", //here defining each column
    headerName:"Name",
    headerClassName:"table-header",
    width:300
    }
    , {
      field: "groupChat",
      headerName: "Group",
      headerClassName: "table-header",
      width: 100,
    },
    ,{//it will be the columns of the TABLE
      //here defining each column
     
      field: "totalMembers",
      headerName: "Total Members",
      headerClassName: "table-header",
      width: 120,
      }
      
      ,{//it will be the columns of the TABLE
        field:"members", //here defining each column
        headerName:"Members",
        headerClassName:"table-header",
        width:400,
        renderCell:(params)=>(<Avatarcard max={100} avatar={params.row.members}/>)

        }
          ,{
            //it will be the columns of the TABLE
            //here defining each column
            
            
            field: "totalMessages",
            headerName: "Total Messages",
            headerClassName: "table-header",
            width: 120,
            }





            ,{//it will be the columns of the TABLE
              field:"creator", //here defining each column
              headerName:"Created By",
              headerClassName:"table-header",
              width:250,
              renderCell:(params)=>(
  
                // In MUI's DataGrid, params holds all relevant
                //  data for the specific cell of a particular row.
                  // console.log(params); // Debugging: View params object in console
              <Stack direction={"row"} alignItems={"center" } spacing={"1rem"}>
                        <Avatar alt={params.row.name}
                  // renderCell is a custom rendering function
                  //  for a specific column in DataGrid.
                    src={params.row.avatar}
                
                />
        <span>{params.row.creator.name}</span>
                

              </Stack>
              
              
              )
              }
];

const Chatmanagement = () => {


  const [rows, setrows] = useState([]);



  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/admin/chats`, {
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
    if (stats.chats) {
      setrows(
        stats.chats.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((i) => transformImage(i, 50)),
          members: i.members.map((i) => transformImage(i.avatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: transformImage(i.creator.avatar, 50),
          },
        }))
      );
    }
  }, [stats]);



//    useEffect(() => {
//     setrows(dashboardData
// .chats.map(i=>({...i
//   // ...i-->
// // This spreads all properties of i 
// // (each user object) into a new object
//   ,id:i._id,
//   // id: i._id-->
// // The _id field from i is mapped to id.

// // This is likely done to match the expected structure of DataGrid,
// //  which uses id instead of _id
// avatar:i.avatar.map((i)=>transformImage(i,50))//it will transform the image according to the needed purpose
// ,

// // avatar: Array.isArray(i.avatar) && i.avatar.length > 0
// // ? transformImage(i.avatar[0], 50)  // Transform only the first image
// // : "",

// members:i.members.map((j)=>transformImage(j.avatar,50)),
// creator:{

//   name:i.creator.name,
//   avatar:transformImage(i.creator.avatar,50)
// }
// })))}, [])


return (
<AdminLayout>
{loading ? (
        <Skeleton height={"100vh"} />
      ) : (
<Table heading={"All Chats"} colums={colums} rows={rows}/>
      )}</AdminLayout>
  )
}



export default Chatmanagement
